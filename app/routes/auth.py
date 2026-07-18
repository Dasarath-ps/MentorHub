from fastapi import APIRouter, HTTPException
from app.database import db
from app.schema import UserAuth
from app.security import hash_password, verify_password

router = APIRouter(tags=["Authentication"])


@router.post("/login")
async def login(user_data: UserAuth):
    user = await db["users"].find_one({"email": user_data.email})

    # Combine the checks to prevent user enumeration (good security practice)
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful"}


@router.post("/register")
async def register(user_data: UserAuth):
    # Check if user already exists
    existing_user = await db["users"].find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Convert Pydantic model to dict and hash password
    user_dict = user_data.model_dump()
    user_dict["password"] = hash_password(user_dict["password"])

    result = await db["users"].insert_one(user_dict)

    return {
        "message": "User registered",
        "id": str(result.inserted_id)
    }
