from flask import Flask, jsonify 
import requests
import json
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

api_key = "OKRP7XRTHZE2LCWM"
base_url = "https://www.alphavantage.co/query?"

with open("stock_portfolio.json", "r") as file:
    portfolio = json.load(file)

with open("stock_portfolio_details.json", "r") as file:
    portfolio_details = json.load(file)

def get_stock_final_price(symbol, api_key, base_url):
    function = "TIME_SERIES_DAILY"
    url = f"{base_url}function={function}&symbol={symbol}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        time_series = data.get("Time Series (Daily)", {})
        if time_series:
            latest_date = max(time_series.keys())
            final_price = float(time_series[latest_date]["4. close"])
            return final_price
        else:
            return "Data not available"
    else:
        return "Sorry the request failed. Please try again later."
    
def get_historical_stock_price(symbol, api_key, base_url, date):
    function = "TIME_SERIES_DAILY"
    url = f"{base_url}function={function}&symbol={symbol}&apikey={api_key}&outputsize=full"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if "Time Series (Daily)" in data:
            time_series = data["Time Series (Daily)"]
            if date in time_series:
                return float(time_series[date]["4. close"])
            else:
                sorted_dates = sorted(time_series.keys())
                for sorted_date in sorted_dates:
                    if sorted_date > date:
                        return float(time_series[sorted_date]["4. close"])
                
                return None
        else:
            return None  
    else:
        return None  
    
def calculate_portfolio_value(portfolio_details, api_key, base_url):
    total_value = 0
    graph_data = {}
    errors = []

    for investment in portfolio_details["investments"]:
        symbol = investment["symbol"]
        final_price = get_stock_final_price(symbol, api_key, base_url)
        
        if isinstance(final_price, float):
            for investment_detail in investment["investments"]:
                date = investment_detail["date"]
                amount_invested = investment_detail["amount"]
                historical_price = get_historical_stock_price(symbol, api_key, base_url, date)
                
                if isinstance(historical_price, float):
                    shares_bought = amount_invested / historical_price
                    current_value = shares_bought * final_price
                    total_value += current_value
                    if symbol not in graph_data:
                        graph_data[symbol] = []
                    graph_data[symbol].append({"date": date, "value": current_value})
                else:
                    errors.append(f"Error retrieving historical data for {symbol} on {date}: {historical_price}")
        else:
            errors.append(f"Error retrieving current price for {symbol}: {final_price}")

    return total_value, graph_data, errors


@app.route('/api/portfolio', methods=['GET'])
def portfolio_value():

    value, graph_data, errors = calculate_portfolio_value(portfolio_details, api_key, base_url)
    if errors:
        print(errors)
    
    response = {
        "total_value": value,
        "graph_data": graph_data,
        "errors": errors
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)