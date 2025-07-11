from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/{endpoint_path:path}")
async def mock_post(endpoint_path: str, request: Request):
    payload = await request.json()
    print(f"Mock API received POST to /{endpoint_path}: {payload}")
    return JSONResponse(content={"status": "mock", "message": f"Echoing POST to /{endpoint_path}", "data": payload})

@app.get("/test")
async def mock_test():
    return {"status": "success", "message": "Mock API is working."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("mock_api:app", host="0.0.0.0", port=5000, reload=True)