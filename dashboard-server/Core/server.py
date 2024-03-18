import asyncio
from typing import Callable
from contextlib import asynccontextmanager
from enum import Enum

from Core.tasks import (
    fetch_google_finance_price,
    fetch_binance_p2p_price,
    fetch_bitkub_price,
)
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# super important
price_data = {}

POLLING_INTERVAL = 2

class DataFrom(Enum):
    GOOGLE = 0
    BINANCE = 1
    BITKUB = 2


async def polling(func: Callable, seconds: int, data_label: DataFrom) -> None:

    while True:
        price_data[data_label] = await func()
        # print(f'price_data[{data_label.name}]: {price_data[data_label]}')
        await asyncio.sleep(seconds)


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    asyncio.create_task(
        polling(
            fetch_google_finance_price, POLLING_INTERVAL, DataFrom.GOOGLE))
    asyncio.create_task(
        polling(
            fetch_binance_p2p_price, POLLING_INTERVAL, DataFrom.BINANCE))
    asyncio.create_task(
        polling(
            fetch_bitkub_price, POLLING_INTERVAL, DataFrom.BITKUB))
    yield


app = FastAPI(lifespan=app_lifespan)

async def run_server() -> None:    
    uvicorn.run(
        'Core.server:app', 
        host='0.0.0.0', 
        port=8080, 
        reload=True,)

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/google-price')
async def get_google_price():
    data = price_data.get(DataFrom.GOOGLE, '')
    return {'data': data}


@app.get('/binance-price')
async def get_binance_price():
    data = price_data.get(DataFrom.BINANCE, '')
    return {'data': data}


@app.get('/bitkub-price')
async def get_bitkub_price():
    data = price_data.get(DataFrom.BITKUB, '')
    return {'data': data}