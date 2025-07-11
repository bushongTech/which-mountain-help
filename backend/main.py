from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers from routes/__init__.py
from backend.routes import routers

for router in routers:
    app.include_router(router)

# Root route serving xbde main index.html
@app.get("/")
async def root():
    return FileResponse("xbde/public/index.html")

# Mount static folders for all frontend services
app.mount("/xbde", StaticFiles(directory="xbde/public"), name="xbde")
app.mount("/cure-service", StaticFiles(directory="cure-service/public"), name="cure-service")
app.mount("/liner-service", StaticFiles(directory="liner-service/public"), name="liner-service")
app.mount("/liner-application-service", StaticFiles(directory="liner-application-service/public"), name="liner-application-service")
app.mount("/material-service", StaticFiles(directory="material-service/public"), name="material-service")
app.mount("/single_run", StaticFiles(directory="single_run/public"), name="single_run")
app.mount("/tdms-uploader", StaticFiles(directory="tdms-uploader/public"), name="tdms-uploader")
app.mount("/tensile_dashboard", StaticFiles(directory="tensile_dashboard/public"), name="tensile_dashboard")