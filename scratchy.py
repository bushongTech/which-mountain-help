from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Determine environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEV_API_BASE_URL = os.getenv("DEV_API_BASE_URL")
PROD_API_BASE_URL = os.getenv("PROD_API_BASE_URL")

# Select API base URL based on environment
API_BASE_URL = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

app = FastAPI()

# -------------------------
# CORS setup
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Serve xbde main app at root
# -------------------------
@app.get("/")
async def root():
    return FileResponse("xbde/public/index.html")

# -------------------------
# Mount each service's public folder
# -------------------------
app.mount("/xbde", StaticFiles(directory="xbde/public"), name="xbde")
app.mount("/cure-service", StaticFiles(directory="cure-service/public"), name="cure-service")
app.mount("/liner-service", StaticFiles(directory="liner-service/public"), name="liner-service")
app.mount("/liner-application-service", StaticFiles(directory="liner-application-service/public"), name="liner-application-service")
app.mount("/material-service", StaticFiles(directory="material-service/public"), name="material-service")
app.mount("/single_run", StaticFiles(directory="single_run/public"), name="single_run")
app.mount("/tdms-uploader", StaticFiles(directory="tdms-uploader/public"), name="tdms-uploader")
app.mount("/tensile_dashboard", StaticFiles(directory="tensile_dashboard/public"), name="tensile_dashboard")

# -------------------------
# Generic API Proxy Routes
# -------------------------
@app.get("/api/{endpoint_path:path}")
async def proxy_get(endpoint_path: str, request: Request):
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_BASE_URL}/{endpoint_path}", params=params)
    return JSONResponse(status_code=response.status_code, content=response.json())

@app.post("/api/{endpoint_path:path}")
async def proxy_post(endpoint_path: str, request: Request):
    payload = await request.json()
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{API_BASE_URL}/{endpoint_path}", json=payload)
    return JSONResponse(status_code=response.status_code, content=response.json())

# -------------------------
# Liner Service Submission Endpoint
# -------------------------
@app.post("/api/liner-service/submit")
async def liner_submit(payload: dict):
    # Print payload for verification
    print("Received liner submission:", payload)

    # Forward to dev or prod API
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_BASE_URL}/liner/submit",  # Adjust endpoint path accordingly
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error forwarding to API:", e)
        return {"status": "error", "message": str(e)}

# -------------------------
# Startup entry point
# -------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)