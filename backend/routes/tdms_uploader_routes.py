from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from nptdms import TdmsFile
import io
import httpx
import os

router = APIRouter()

# Environment variables
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEV_API_BASE_URL = os.getenv("DEV_API_BASE_URL")
PROD_API_BASE_URL = os.getenv("PROD_API_BASE_URL")
API_BASE_URL = DEV_API_BASE_URL if ENVIRONMENT == "development" else PROD_API_BASE_URL

@router.post("/api/tdms-uploader/upload")
async def upload_tdms(
    file: UploadFile = File(...),
    program: str = Form(...),
    article_type: str = Form(...),
    article_id: str = Form(...),
    test_date: str = Form(...),
    test_operator: str = Form(...),
    test_location: str = Form(...),
    ambient_temp: float = Form(...),
    ambient_humidity: float = Form(...)
):
    try:
        # Read uploaded TDMS file into memory
        tdms_content = await file.read()
        tdms_file = TdmsFile.read(io.BytesIO(tdms_content))
        df = tdms_file.as_dataframe()

        # Clean column names to keep only the last segment
        df.columns = [col.split('/')[-1] for col in df.columns]

        # Convert dataframe to list of dicts for telemetry data
        telemetry_data = df.to_dict(orient='records')

        # Build final JSON object with metadata and telemetry
        payload = {
            "metadata": {
                "Program": program,
                "Article Type": article_type,
                "Article ID": article_id,
                "Test Date": test_date,
                "Test Operator": test_operator,
                "Test Location": test_location,
                "Ambient Temperature": ambient_temp,
                "Ambient Humidity": ambient_humidity
            },
            "telemetry": telemetry_data
        }

        # Post the JSON object to your external API at /v1/tdms-uploader
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_BASE_URL}/v1/tdms-uploader",
                json=payload
            )

        # Return API response to frontend
        return JSONResponse(status_code=response.status_code, content=response.json())

    except Exception as e:
        print(f"Error uploading TDMS data: {e}")
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)