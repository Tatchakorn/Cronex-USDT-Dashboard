import asyncio
from typing import Literal

import httpx

from ContentParser.parser import (
    parse_google_price,
    parse_binance_price,
    parse_bitkub_price,
)

Side = Literal['BUY', 'SELL']


def get_binance_post_body(side: Side):
    return {
        'fiat': 'THB',
        'page': 1,
        'rows': 5,
        'transAmount': 1000000,
        'tradeType': side,
        'asset': 'USDT',
        'countries': [],
        'proMerchantAds': False,
        'shieldMerchantAds': False,
        'filterType': 'all',
        'additionalKycVerifyFilter': 0,
        'publisherType': None,
        'payTypes': [],
        'classifies': [
            'mass',
            'profession'
        ],
        'area': 'P2P'
    }

async def fetch_google_finance_price():
    url = 'https://www.google.com/finance/quote/USDT-THB'

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            try:
                price = parse_google_price(response.text)
            except Exception as e:
                print(f'Error: {e}')
                price = 'Error' 
        else:
            price = 'Error'
    return price


async def fetch_binance_p2p_price():

    async with httpx.AsyncClient() as client:
        base_url = 'https://p2p.binance.com'
        url = base_url + '/bapi/c2c/v2/friendly/c2c/adv/search'
        
        buy_body = get_binance_post_body('BUY')
        sell_body = get_binance_post_body('SELL')
        
        buy_res, sell_res = await asyncio.gather(*(
            client.post(url, json=buy_body),
            client.post(url, json=sell_body),
        ))
                
        return parse_binance_price(buy_res.json(), sell_res.json())


async def fetch_bitkub_price():
    base_url = 'https://api.bitkub.com'
    limit = 5
    
    order_url = base_url + f'/api/market/books?sym=THB_USDT&lmt={limit}'
    ticker_url = base_url + '/api/market/ticker?sym=THB_USDT'  
    server_dt_url = base_url + '/api/v3/servertime'  
    request_urls = (ticker_url, order_url,)

    async with httpx.AsyncClient() as client:
        await client.get(server_dt_url)
        results = await asyncio.gather(*(
            [client.get(url) for url in request_urls]
        ))
        results = [res.json() for res in results]
        return parse_bitkub_price(*results)