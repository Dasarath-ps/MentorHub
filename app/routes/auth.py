from fastapi import APIRouter, HTTPException, status
from app.database import db
from app.schema import UserAuth
from app.schema import LoginModel
from app.schema import VerifyOTPRequest
from app.schema import AdminAuth
from app.security import create_access_token, hash_password, verify_password
from secrets import randbelow
from datetime import datetime, timedelta
from app.email_service import send_otp

router = APIRouter(tags=["Authentication"])

#login page 
@router.post("/login")
async def login(user_data: LoginModel):
    user = await db["users"].find_one({"email": user_data.email})
    admin = await db["AdminAuth"].find_one({"adminName": user_data.email})
    if admin:
        if not user_data.password == admin["password"]:
            raise HTTPException(status_code=401, detail="Invalid admin credentials")

        token = create_access_token({"sub": admin["adminName"], "role": "admin"})
        return {"message": "Admin login successful", "token": token}

    # Combine the checks to prevent user enumeration (good security practice)
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.get("is_verified", False):
        raise HTTPException(
            status_code=403,
            detail="Your email is not verified. Please verify your OTP before logging in."
        )

    token = create_access_token({"sub": user["email"], "role": "user"})
    return {
        "message": "User login successful",
        "token": token,
        "user": {
            "email": user["email"],
            "username": user.get("username") or user.get("userName")
        }
    }

#register page 
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
        user_dict = user_data.model_dump()
        user_dict["username"] = user_dict["userName"]
        user_dict["email"] = user_dict["email"]
        user_dict["password"] = hash_password(user_dict["password"])
        user_dict["is_verified"] = False  # Mark unverified until OTP check
        user_dict["created_at"] = datetime.utcnow()

        await db["users"].insert_one(user_dict)

        # Check if a valid OTP already exists
        existing_otp = await db["otp"].find_one({
            "email": user_data.email
        })

        if existing_otp:
            # Check whether it has expired
            if datetime.utcnow() < existing_otp["expires_at"]:
                raise HTTPException(
                    status_code=400,
                    detail="A valid OTP has already been sent. Please check your email or wait until it expires."
                )
            # OTP has expired, remove it
            await db["otp"].delete_one({"email": user_data.email})

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
            "message": "OTP send successfully",
            #"otp":otp
        }

#varify otp
@router.post("/verify-otp")
async def verify_otp(data: VerifyOTPRequest ):  #  FastAPI uses the schema here
    # 1. Fetch OTP record from DB using email from data
    otp_record = await db["otp"].find_one({"email": data.email})
    
    # 2. Check if record exists and if OTP matches
    if not otp_record or otp_record["otp"] != data.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP code"
        )
# 4. Update the user table -> set is_verified to True 👈 ADDED THIS
    await db["users"].update_one(
        {"email": data.email},
        {"$set": {"is_verified": True}}
    )
    # 3. Clean up OTP record on successful match
    await db["otp"].delete_one({"email": data.email})

    return {"message": "OTP verified successfully"}