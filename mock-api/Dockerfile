FROM python:latest

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy mock_api.py into container
COPY mock_api.py .

# Expose port 5000 for mock-api
EXPOSE 5000

# Start the mock API server
CMD ["uvicorn", "mock_api:app", "--host", "0.0.0.0", "--port", "5000"]