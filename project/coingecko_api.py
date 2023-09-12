import requests
from datetime import datetime

def get_coins_lists():
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    return response.json()
  

def get_crypto_data(ticker):
    # historical data
    url = "https://api.coingecko.com/api/v3/coins/%s/market_chart?vs_currency=usd&days=3" % ticker
    response = requests.get(url)
    data = response.json()
    prices_by_hour = []
    for i in range(0, len(data["prices"])):
      data_hour = data["prices"][len(data["prices"]) - i - 1]
      data_hour[0] = datetime.fromtimestamp(data_hour[0] / 1000).strftime("%Y-%m-%d %H:%M:%S")
      prices_by_hour.append(data_hour)

    # current price
    url = "https://api.coingecko.com/api/v3/coins/%s" % ticker
    response = requests.get(url)
    data = response.json()["market_data"]["current_price"]["usd"]
    prices_by_hour[0] = [datetime.now().strftime("%Y-%m-%d %H:%M:%S"), data]
    prices_by_hour = prices_by_hour[:64][::-1]
    price_change_percentage_24h = response.json()["market_data"]["price_change_percentage_24h"]
    
    # graph candle data
    prices = [entry[1] for entry in prices_by_hour]
    min_price = min(prices)
    max_price = max(prices)
    max_height = 15
    scale_factor = (max_price - min_price) / max_height
    
    chart = []
    for data_hour in prices_by_hour:
        body_height = int((data_hour[1] - min_price) / scale_factor) + 1
        chart.append(body_height)

    return {
      "ticker": ticker,
      "current_price": data,
      "price_change_percentage_24h": price_change_percentage_24h,
      "prices_by_hour": prices_by_hour,
      "chart": chart
    }

def plot_candlestick(chart, max_height=15):
    max_height = max(chart)
    chart_console = [[' ' for _ in range(len(chart))] for _ in range(max_height)]

    for i, value in enumerate(chart):
      for j in range(max_height - value, max_height):
          chart_console[j][i] = '█'

    for row in chart_console:
        print(''.join(row))
   
data = get_crypto_data("avalanche-2")
plot_candlestick(data["chart"])
# print(data)