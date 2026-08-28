from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Form, File, UploadFile
from app.database import db
import base64

from app.email_service import send_approval_email
router = APIRouter(tags=["Mentor Application"])
@router.get("/mentors")
async def get_mentors():
    mentors = await db["mentors"].find({"accepted": "pending"}).to_list(length=10) # Adjust the length as needed
    for mentor in mentors:
        # Convert ObjectId to string for JSON serialization
        mentor["_id"] = str(mentor["_id"])
        if mentor.get("profilePic"):
            # Convert the profile picture to base64 string
            mentor["profilePic"] = base64.b64encode(mentor["profilePic"]).decode("utf-8")
    return {"data" : mentors,"message":"successfully fetched mentors"}
@router.get("/mentors/{id}")
async def get_mentor(id: str):
    print(f"mentor id : {id}")
    mentor = await db["mentors"].find_one({"_id": ObjectId(id)})
    if not mentor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mentor not found")
    
    # Convert ObjectId to string for JSON serialization
    mentor["_id"] = str(mentor["_id"])
    if mentor.get("profilePic"):
        # Convert the profile picture to base64 string
        mentor["profilePic"] = base64.b64encode(mentor["profilePic"]).decode("utf-8")
    
    return {"data": mentor, "message": "successfully fetched mentor"}
@router.post("/mentors/{id}/approve")
async def approve_mentor(id: str):
    mentor = await db["mentors"].find_one({"_id": ObjectId(id)})
    if not mentor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mentor not found")
    await db["mentors"].update_one({"_id": ObjectId(id)}, {"$set": {"accepted": "true"}})
    # Send approval email
    await send_approval_email(mentor["email"])
    return {"message": "Mentor approved successfully"}  