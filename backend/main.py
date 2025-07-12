from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Environment config
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEV_API_BASE_URL = os.getenv("DEV_API_BASE_URL")
PROD_API_BASE_URL = os.getenv("PROD_API_BASE_URL")

# Initialize app
app = FastAPI()

# CORS setup (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve xbde main app at root
@app.get("/")
async def root():
    return FileResponse("xbde/public/index.html")

# Mount xbde public folder
app.mount("/xbde", StaticFiles(directory="xbde/public"), name="xbde")

# Mount each service's public folder
app.mount("/cure-service", StaticFiles(directory="cure-service/public"), name="cure-service")
app.mount("/liner-service", StaticFiles(directory="liner-service/public"), name="liner-service")
app.mount("/liner-application-service", StaticFiles(directory="liner-application-service/public"), name="liner-application-service")
app.mount("/material-service", StaticFiles(directory="material-service/public"), name="material-service")
app.mount("/tdms-uploader", StaticFiles(directory="tdms-uploader/public"), name="tdms-uploader")

# Import and include routers
from backend.routes import (
    tdms_uploader_routes,
    liner_routes,
    liner_application_routes,
    material_routes,
    cure_routes
)

app.include_router(tdms_uploader_routes.router)
app.include_router(liner_routes.router)
app.include_router(liner_application_routes.router)
app.include_router(material_routes.router)
app.include_router(cure_routes.router)

# Startup entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8090, reload=True)