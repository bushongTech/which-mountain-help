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

# GET /v1/materials/<material_id>
@router.get("/api/v1/materials/{material_id}")
async def get_material(material_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/materials/{material_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())

# GET /v1/materials
@router.get("/api/v1/materials")
async def get_all_materials(request: Request):
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/materials", params=params)
    return JSONResponse(status_code=response.status_code, content=response.json())

# POST /v1/materials (create new material)
@router.post("/api/v1/materials")
async def create_material(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{target_api}/v1/materials",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error creating material:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/materials/<material_id> (update specific material)
@router.put("/api/v1/materials/{material_id}")
async def update_material_by_id(material_id: int, payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/materials/{material_id}",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating material:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/materials (general update endpoint)
@router.put("/api/v1/materials")
async def update_material(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/materials",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating material:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)