import requests
from datetime import datetime

def get_coins_lists():
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    return response.json()
  

def get_market_chart(ticker):
    url = "https://api.coingecko.com/api/v3/coins/%s/market_chart?vs_currency=usd&days=3" % ticker
    response = requests.get(url)
    data = response.json()
    prices_by_hour = []
    for i in range(0, len(data["prices"])):
      data_hour = data["prices"][len(data["prices"]) - i - 1]
      data_hour[0] = datetime.fromtimestamp(data_hour[0] / 1000).strftime("%Y-%m-%d %H:%M:%S")
      prices_by_hour.append(data_hour)

    url = "https://api.coingecko.com/api/v3/coins/%s" % ticker
    response = requests.get(url)
    data = response.json()["market_data"]["current_price"]["usd"]
    prices_by_hour[0] = [datetime.now().strftime("%Y-%m-%d %H:%M:%S"), data]
    
    return {
      "ticker": ticker,
      "current_price": data,
      "price_change_percentage_24h": response.json()["market_data"]["price_change_percentage_24h"],
      "prices_by_hour": prices_by_hour,
    }

def plot_candlestick(data, max_height=16):
    prices = [entry[1] for entry in data]
    min_price = min(prices)
    max_price = max(prices)
    
    scale_factor = (max_price - min_price) / max_height
    
    chart = []
   



data = get_market_chart("ethereum")

plot_candlestick(data["prices_by_hour"])
