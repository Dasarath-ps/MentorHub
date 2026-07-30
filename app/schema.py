from pydantic import BaseModel
from datetime import datetime

class LoginModel(BaseModel):
    email: str
    password: str

class UserAuth(BaseModel):
    userName: str
    email: str
    password: str

class OTPModel(BaseModel):
    email: str
    otp: str
    created_at: datetime
    expires_at: datetime
    attempts: int = 0

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str