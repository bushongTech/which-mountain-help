from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/{full_path:path}")
async def mock_post(request: Request, full_path: str):
    """
    Echoes back any POST request payload for development testing.
    """
    data = await request.json()
    print(f"Mock POST to /{full_path} with data: {data}")
    return JSONResponse(content={
        "status": "success",
        "message": f"Mock POST received at /{full_path}",
        "echo": data
    })

@app.put("/{full_path:path}")
async def mock_put(request: Request, full_path: str):
    """
    Echoes back any PUT request payload for development testing.
    """
    data = await request.json()
    print(f"Mock PUT to /{full_path} with data: {data}")
    return JSONResponse(content={
        "status": "success",
        "message": f"Mock PUT received at /{full_path}",
        "echo": data
    })

@app.get("/{full_path:path}")
async def mock_get(full_path: str):
    """
    Returns a simple success message for any GET request.
    """
    print(f"Mock GET to /{full_path}")
    return JSONResponse(content={
        "status": "success",
        "message": f"Mock GET received at /{full_path}"
    })
