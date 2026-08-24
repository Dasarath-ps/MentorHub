from fastapi import APIRouter, HTTPException, status, Form, File, UploadFile
from app.database import db
import base64
router = APIRouter(tags=["Mentor Application"])
@router.get("/mentors")
async def get_mentors():
    mentors = await db["mentors"].find().to_list(length=10) # Adjust the length as needed
    for mentor in mentors:
        # Convert ObjectId to string for JSON serialization
        mentor["_id"] = str(mentor["_id"])
        if mentor.get("profilePic"):
            # Convert the profile picture to base64 string
            mentor["profilePic"] = base64.b64encode(mentor["profilePic"]).decode("utf-8")
    return {"data" : mentors,"message":"successfully fetched mentors"}