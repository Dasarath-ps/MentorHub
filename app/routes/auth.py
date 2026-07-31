from fastapi import APIRouter, HTTPException
from app.database import db
from app.schema import UserAuth
from app.schema import LoginModel
from app.security import hash_password, verify_password
from secrets import randbelow
from datetime import datetime, timedelta
from app.email_service import send_otp

router = APIRouter(tags=["Authentication"])


@router.post("/")
async def login(user_data: LoginModel):
    print(user_data)
    user = await db["users"].find_one({"email": user_data.email})

    # Combine the checks to prevent user enumeration (good security practice)
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful"}


@router.post("/register")
async def register(user_data: UserAuth):
    #print(user_data)
    # Check if user already exists
    existing_user = await db["users"].find_one({"email": user_data.email})
    if existing_user:
        return {
            "message": "User already exists"
        }
    else:
        # Generate a secure 6-digit OTP
        otp = "".join(str(randbelow(10)) for _ in range(6))

        # Store OTP
        await db["otp"].insert_one({
            "email": user_data.email,
            "otp": otp,
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(minutes=5),
            "attempts": 0
        })
        await send_otp(user_data.email,otp)
        return {
            "message": "OTP sent successfully",
            "otp":otp
        }

    # Convert Pydantic model to dict and hash password
    user_dict = user_data.model_dump()
    user_dict["password"] = hash_password(user_dict["password"])

    result = await db["users"].insert_one(user_dict)

    return {
        "message": "User registered",
        "id": str(result.inserted_id)
    }
