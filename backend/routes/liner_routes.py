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

@router.get("/api/liner-service/example")
async def liner_example():
    return {"message": "Liner Service example route working."}

@router.post("/api/liner-service/submit")
async def liner_submit(payload: dict):
    print("Received liner submission:", payload)

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