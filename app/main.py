from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, mentor

app = FastAPI(title="College App API")

origins = ["http://localhost:5173", "http://localhost:5174"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the routers
app.include_router(auth.router)
app.include_router(mentor.router)
