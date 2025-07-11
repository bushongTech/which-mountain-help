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

# GET /v1/cure-batch/<cure_batch_id>
@router.get("/api/v1/cure-batch/{cure_batch_id}")
async def get_cure_batch(cure_batch_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/cure-batch/{cure_batch_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())

# GET /v1/cure-batch
@router.get("/api/v1/cure-batch")
async def get_all_cure_batches(request: Request):
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/cure-batch", params=params)
    return JSONResponse(status_code=response.status_code, content=response.json())

# POST /v1/cure-batch (create new cure batch)
@router.post("/api/v1/cure-batch")
async def create_cure_batch(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{target_api}/v1/cure-batch",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error creating cure batch:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/cure-batch/<cure_batch_id> (update specific cure batch)
@router.put("/api/v1/cure-batch/{cure_batch_id}")
async def update_cure_batch_by_id(cure_batch_id: int, payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/cure-batch/{cure_batch_id}",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating cure batch:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/cure-batch (general update endpoint)
@router.put("/api/v1/cure-batch")
async def update_cure_batch(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/cure-batch",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error updating cure batch:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)