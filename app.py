from flask import Flask, jsonify, request
import requests
import json
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta
import logging

app = Flask(__name__)

# Define allowed origins
allowed_origins = ["http://localhost:3000", " http://192.168.0.15:3000"]


# Initialize CORS with allowed origins
CORS(app, origins=allowed_origins)

logging.basicConfig(level=logging.DEBUG)


api_key = "ZBD3QIPITMQNSPPF"
base_url = "https://www.alphavantage.co/query?"

with open("stock_portfolio.json", "r") as file:
    portfolio = json.load(file)

with open("stock_portfolio_details.json", "r") as file:
    portfolio_details = json.load(file)

def get_stock_final_price(symbol):
    function = "TIME_SERIES_DAILY"
    url = f"{base_url}function={function}&symbol={symbol}&apikey={api_key}&outputsize=compact"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        time_series = data.get("Time Series (Daily)", {})
        if time_series:
            latest_date = max(time_series.keys())
            final_price = float(time_series[latest_date]["4. close"])
            return final_price
        else:
            return None
    else:
        return None
    
def get_historical_stock_prices(symbol, date):
    function = "TIME_SERIES_DAILY"
    url = f"{base_url}function={function}&symbol={symbol}&apikey={api_key}&outputsize=full"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        time_series = data.get("Time Series (Daily)", {})
        if date in time_series:  # Check if the purchase date is in the time series data
            return float(time_series[date]["4. close"])  # Return the closing price for the given date
        else:
            return None  # Or you could choose to return a default value or raise an exception
    else:
        # Handle errors, possibly by logging or retrying
        pass


# @app.route('/api/stock-performance', methods=['GET'])
# def get_stock_performance():
#     symbol = request.args.get('symbol')
#     # Default to "YTD" if time_frame is not specified
#     time_frame = request.args.get('time_frame', 'YTD')  

#     # Determine the start_date based on the requested time_frame
#     today = datetime.today()
#     if time_frame == 'YTD':
#         start_date = datetime(today.year, 1, 1)
#     elif time_frame == '6M':
#         start_date = today - timedelta(days=183)
#     elif time_frame == '1Y':
#         start_date = today - timedelta(days=365)
#     elif time_frame == 'ALL':
#         start_date = datetime.min
#     else:
#         return jsonify({"error": "Invalid time frame"}), 400

#     start_date_str = start_date.strftime('%Y-%m-%d')
    
#     # Adjusted the function call as per the previous example
#     historical_prices = get_historical_stock_prices(symbol, start_date_str)  # No need for end_date_str
    
#     return jsonify(historical_prices)

def calculate_portfolio_value_and_roi(portfolio_details):
    total_invested = 0
    total_current_value = 0
    graph_data = {}

    for investment in portfolio_details['investments']:
        symbol = investment['symbol']
        for inv in investment['investments']:
            invested_amount = inv['invested']
            purchase_date = inv['date']

            # Fetch the historical stock price for the exact purchase date
            purchase_price = get_historical_stock_prices(symbol, purchase_date)
            
            if purchase_price is None:
                print(f"Missing historical price data for {symbol} on {purchase_date}. Skipping this investment.")
                continue

            # Calculate how many shares were bought
            shares_bought = invested_amount / purchase_price

            # Get the current price of the stock
            current_price = get_stock_final_price(symbol)
            if current_price is None:
                print(f"Current price for {symbol} is not available. Skipping this investment.")
                continue

            # Calculate current value of this investment
            current_value = shares_bought * current_price

            # Update totals
            total_invested += invested_amount
            total_current_value += current_value

            # Store data for this investment
            graph_data[symbol] = {
                "purchase_price": purchase_price,
                "current_price": current_price,
                "shares_bought": shares_bought,
                "current_value": current_value,
            }

    # Calculate ROI
    roi = ((total_current_value - total_invested) / total_invested) * 100 if total_invested > 0 else 0

    return total_current_value, roi, graph_data


# API endpoint for the portfolio summary
@app.route('/api/portfolio', methods=['GET'])
def get_portfolio_summary():
    total_value, roi, graph_data = calculate_portfolio_value_and_roi(portfolio_details)
    
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
    
def calculate_total_amount(symbol):
    # This function should add up all 'invested' amounts for the given symbol.
    total_invested = 0
    for investment in portfolio_details['investments']:
        if investment['symbol'] == symbol:
            for inv in investment['investments']:
                total_invested += inv['invested']
    return total_invested


def calculate_stock_roi(symbol):
    # This function should calculate the ROI based on the total invested amount and current value of stocks.
    total_investment = calculate_total_amount(symbol)
    current_value = 0
    # Get the current price of the stock
    current_price = get_stock_final_price(symbol)
    if current_price is not None:
        for investment in portfolio_details['investments']:
            if investment['symbol'] == symbol:
                for inv in investment['investments']:
                    # Calculate how many shares were bought
                    shares_bought = inv['invested'] / get_historical_stock_prices(symbol, inv['date'])
                    current_value += shares_bought * current_price
        roi = ((current_value - total_investment) / total_investment) * 100 if total_investment > 0 else 0
        return roi
    else:
        return None  # or handle this case as you see fit

def get_closing_prices_for_last_12_months(symbol):
    start_date = (datetime.today() - timedelta(days=365)).strftime('%Y-%m-%d')
    end_date = datetime.today().strftime('%Y-%m-%d')
    
    historical_prices = get_historical_stock_prices(symbol, start_date, end_date)
    
    # Filter out the prices to keep only the last 12 months
    closing_prices = {date: price for date, price in historical_prices.items() if start_date <= date <= end_date}
    return closing_prices


@app.route('/api/stock-price-over-time', methods=['GET'])
def get_stock_price_over_time():
    # Assuming 'portfolio' is a predefined list of stocks
    all_prices_over_time = []

    # Compile data for each stock
    for symbol in portfolio:
        prices_over_time = {
            "name": symbol,
            "data": []
        }
        final_price = get_stock_final_price(symbol)
        if final_price:
            # In a production scenario, you would pull historical data for each stock
            # Here, we assume the final_price is the price for the past year for simplicity
            for i in range(365):
                date = (datetime.today() - timedelta(days=i)).strftime('%Y-%m-%d')
                prices_over_time["data"].append({"date": date, "price": final_price})
        
        # Add the stock's price data to the overall list
        all_prices_over_time.append(prices_over_time)
    
    # Return all stock data in the expected format
    return jsonify(all_prices_over_time)


@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    stock_data = []
    for stock_info in portfolio['stocks']:
        symbol = stock_info['symbol']
        try:
            final_price = get_stock_final_price(symbol)
            if final_price is not None:
                stock_data.append({
                    'symbol': symbol,
                    'price': final_price
                })
            else:
                # Handle the case where final_price is None
                stock_data.append({
                    'symbol': symbol,
                    'error': 'Price data is not available'
                })
        except Exception as e:
            # Log the exception and return an error message for this stock
            app.logger.error(f"Error fetching price for {symbol}: {e}")
            stock_data.append({
                'symbol': symbol,
                'error': 'An error occurred while fetching the price data'
            })
    return jsonify(stock_data)



if __name__ == "__main__":
    # This enables better error messages in development.
    app.config["DEBUG"] = True
    # Start the Flask app
    app.run()