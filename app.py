from flask import Flask, jsonify, request
import requests
import json
from flask_cors import CORS
from datetime import datetime, timedelta

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
    
def get_historical_stock_prices(symbol, api_key, base_url, start_date, end_date):
    function = "TIME_SERIES_DAILY"
    url = f"{base_url}function={function}&symbol={symbol}&apikey={api_key}&outputsize=full"
    response = requests.get(url)
    
    historical_prices = {}
    
    if response.status_code == 200:
        data = response.json()
        time_series = data.get("Time Series (Daily)", {})
        for date, stats in time_series.items():
            if start_date <= date <= end_date:
                historical_prices[date] = float(stats["4. close"])
    else:
        # Handle errors, possibly by logging or retrying
        pass
    
    return historical_prices 

@app.route('/api/stock-performance', methods=['GET'])
def get_stock_performance():
    symbol = request.args.get('symbol')
    time_frame = request.args.get('time_frame')  # e.g., 'YTD', '6M', '1Y', 'ALL'

    # Determine the start_date based on the requested time_frame
    today = datetime.today()
    if time_frame == 'YTD':
        start_date = datetime(today.year, 1, 1)
    elif time_frame == '6M':
        start_date = today - timedelta(days=183)  # Approx 6 months
    elif time_frame == '1Y':
        start_date = today - timedelta(days=365)
    elif time_frame == 'ALL':
        start_date = datetime.min
    else:
        return jsonify({"error": "Invalid time frame"}), 400

    start_date_str = start_date.strftime('%Y-%m-%d')
    end_date_str = today.strftime('%Y-%m-%d')
    
    historical_prices = get_historical_stock_prices(symbol, api_key, base_url, start_date_str, end_date_str)
    
    return jsonify(historical_prices)

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

@app.route('/api/stock-details/<symbol>', methods=['GET'])
def get_stock_details(symbol):
    try:
        # Placeholder for actual data retrieval and calculation
        total_amount = calculate_total_amount(symbol)
        stock_roi = calculate_stock_roi(symbol)
        closing_prices = get_closing_prices_for_last_12_months(symbol)
        
        response = {
            "symbol": symbol,
            "total_amount": total_amount,
            "roi": stock_roi,
            "closing_prices": closing_prices
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)