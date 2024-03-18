from typing import Dict, List
from bs4 import BeautifulSoup

json_data = Dict[str, any]
binance_data = Dict[str, List[Dict[str, Dict[str, json_data]]]]

def parse_google_price(html: str) -> str:
    soup = BeautifulSoup(html, 'html.parser')
    select_price = 'html body#yDmH0d.tQj5Y.ghyPEc.IqBfM.e2G3Fb.EWZcud c-wiz.zQTmif.SSPGKf.u5wqUe div.T4LgNb div.e1AOyf div main div.Gfxi4 div.VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.QZMA8b c-wiz div div div div.rPF6Lc div.ln0Gqe div div.AHmHk span div.kf1m0 div.YMlKec.fxKbKc'
    price = soup.select_one(select_price).contents[0]
    price = price.text.strip()
    return price

def extract_binance_data(data: json_data):
    data_list = []
    for ad in data:
        adv = ad.get('adv', {})
        advertiser = ad.get('advertiser', {})
        price = adv.get('price')
        min_amount = adv.get('minSingleTransAmount')
        max_amount = adv.get('maxSingleTransAmount')
        nickname = advertiser.get('nickName')
        data_list.append({
            'nickname': nickname,
            'price': price,
            'minAmount': min_amount,
            'maxAmount': max_amount,
        })
    return data_list


def parse_binance_price(buy: binance_data, sell: binance_data):
    buy_data, sell_data = buy.get('data', []), sell.get('data', [])

    buy_data = extract_binance_data(buy_data)
    sell_data = extract_binance_data(sell_data)

    data = {
        'buy': buy_data,
        'sell': sell_data,
    }
    return data


def parse_bitkub_price(ticker: json_data, order: json_data):
    usdt_data = ticker.get('THB_USDT', {})
    last = usdt_data.get('last', '')
    percent_change = usdt_data.get('percentChange', '')
    
    order_result = order.get('result', {})
    asks = order_result.get('asks', [])
    bids = order_result.get('bids', [])
    

    bid_data = []
    ask_data = []
    for bid, ask in zip(bids, asks):
        
        # orderid, timestamp, volume, rate, amount
        # **amount is volume in USDT
        
        _, _, b_volume, b_rate, b_amount = bid
        _, _, a_volume, a_rate, a_amount = ask

        bid_data.append({
            'rate': b_rate,
            'volTHB': b_volume,
            'volUSDT': b_amount,
        })
        ask_data.append({
            'rate': a_rate,
            'volTHB': a_volume,
            'volUSDT': a_amount,
        })
    
    data = {
        'ticker': {
            'price': last,
            'change': percent_change,
        },
        'bids': bid_data,
        'asks': ask_data,
    }
    
    return data