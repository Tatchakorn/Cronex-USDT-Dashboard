# pip install fastapi uvicorn httpx

# Importing necessary libraries
from fastapi import FastAPI, BackgroundTasks
import httpx
import asyncio

# Initializing the FastAPI app
app = FastAPI()

# Global variable to store the latest USDT price
latest_usdt_price = "Fetching..."

# Function to fetch USDT price from Google Finance
# Placeholder for actual logic to fetch the price
async def fetch_usdt_price():
    global latest_usdt_price
    # Example: Fetching price logic goes here
    # Using httpx to make an asynchronous GET request
    # This is a placeholder URL, replace with actual Google Finance API or scraping logic
    url = "https://finance.google.com/finance/quote/USDT-USD"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            # Placeholder logic to parse the response and extract USDT price
            # Replace this with actual parsing logic
            latest_usdt_price = "1.00 USD"  # Example static value for demonstration
        else:
            latest_usdt_price = "Error fetching price"

# Background task to fetch USDT price every 10 seconds
async def background_fetch_price_task():
    while True:
        await fetch_usdt_price()
        await asyncio.sleep(10)

@app.on_event("startup")
async def startup_event():
    # Start the background task for fetching USDT price
    background_task = asyncio.create_task(background_fetch_price_task())

@app.get("/usdt-price")
async def get_usdt_price():
    # Endpoint to return the latest USDT price
    return {"USDT Price": latest_usdt_price}

# Reminder: To run the FastAPI app, use the command:
# uvicorn main:app --reload
# where 'main' is the name of your Python file.

