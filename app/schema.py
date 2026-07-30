from pydantic import BaseModel

class LoginModel(BaseModel):
    email: str
    password: str

class UserAuth(BaseModel):
    userName: str
    email: str
    password: str
    # You can add other fields here for registration (e.g., name: str)
