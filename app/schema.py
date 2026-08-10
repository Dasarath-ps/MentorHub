from pydantic import BaseModel
from datetime import datetime

class LoginModel(BaseModel):
    email: str
    password: str
    userType: str

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

class MentorApplication(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    jobTitle: str
    company: str
    location: str
    category: str
    skills: str
    bio: str
    linkedin: str
    website: str
    whyMentor: str
    achievement: str