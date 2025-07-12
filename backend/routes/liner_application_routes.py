from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import httpx
import os

router = APIRouter()

# Environment variables
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEV_API_BASE_URL = os.getenv("DEV_API_BASE_URL")
PROD_API_BASE_URL = os.getenv("PROD_API_BASE_URL")
API_BASE_URL = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

# GET /v1/liner-application/<application_id>
@router.get("/api/v1/liner-application/{application_id}")
async def get_liner_application(application_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/liner-application/{application_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())

# GET /v1/liner-application
@router.get("/api/v1/liner-application")
async def get_all_liner_applications(request: Request):
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/liner-application", params=params)
    return JSONResponse(status_code=response.status_code, content=response.json())

# POST /v1/liner-application (create new liner application)
@router.post("/api/v1/liner-application")
async def create_liner_application(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{target_api}/v1/liner-application",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error creating liner application:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/liner-application/<application_id> (update specific liner application)
@router.put("/api/v1/liner-application/{application_id}")
async def update_liner_application_by_id(application_id: int, payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/liner-application/{application_id}",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating liner application:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/liner-application (general update endpoint)
@router.put("/api/v1/liner-application")
async def update_liner_application(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/liner-application",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating liner application:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)