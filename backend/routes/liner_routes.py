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

# GET /v1/liner-batch/<liner_batch_id>
@router.get("/api/v1/liner-batch/{liner_batch_id}")
async def get_liner_batch(liner_batch_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/liner-batch/{liner_batch_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())

# GET /v1/liner-batch
@router.get("/api/v1/liner-batch")
async def get_all_liner_batches(request: Request):
    params = dict(request.query_params)
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/liner-batch", params=params)
    return JSONResponse(status_code=response.status_code, content=response.json())

# GET /v1/liner-batch-materials/<liner_batch_id>
@router.get("/api/v1/liner-batch-materials/{liner_batch_id}")
async def get_liner_batch_materials(liner_batch_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PROD_API_BASE_URL}/v1/liner-batch-materials/{liner_batch_id}")
    return JSONResponse(status_code=response.status_code, content=response.json())

# POST /v1/liner-batch (create a new liner batch)
@router.post("/api/v1/liner-batch")
async def create_liner_batch(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{target_api}/v1/liner-batch",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error forwarding to API:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/liner-batch/<liner_batch_id> (update specific liner batch)
@router.put("/api/v1/liner-batch/{liner_batch_id}")
async def update_liner_batch_by_id(liner_batch_id: int, payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/liner-batch/{liner_batch_id}",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error forwarding to API:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

# PUT /v1/liner-batch (general update endpoint)
@router.put("/api/v1/liner-batch")
async def update_liner_batch(payload: dict):
    target_api = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{target_api}/v1/liner-batch",
                json=payload
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except Exception as e:
        print("Error forwarding to API:", e)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)