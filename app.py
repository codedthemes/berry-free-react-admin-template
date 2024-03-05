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
    
# Function to calculate the total portfolio value and ROI
def calculate_portfolio_value_and_roi(portfolio_details):
    total_value = 0
    total_investment = 0
    graph_data = {}

    for stock in portfolio_details['stocks']:
        symbol = stock['symbol']
        quantity = stock['quantity']
        purchase_price = stock['purchase_price']
        
        # Simulate getting the final price from an external API
        final_price = get_stock_final_price(symbol)
        total_value += quantity * final_price

        # Calculate total investment
        total_investment += quantity * purchase_price

        # Simulate getting historical price data for the graph
        graph_data[symbol] = {
            "purchase_price": purchase_price,
            "current_price": final_price,
            # Include other historical data points as needed
        }
    
    # Calculate ROI
    total_invested = sum(detail["amount"] for detail in portfolio_details["investments"])
    roi = ((total_value - total_invested) / total_invested) * 100

    # Return total_value, ROI, and graph_data
    return total_value, roi, graph_data

# API endpoint for the portfolio summary
@app.route('/api/portfolio', methods=['GET'])
def get_portfolio_summary():
    total_value, roi, graph_data = calculate_portfolio_value_and_roi(portfolio_details, api_key, base_url)
    
    # Create a response object
    response = {
        "total_portfolio_value": total_value,
        "roi": roi,
        "graph_data": graph_data
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)