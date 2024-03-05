from flask import Flask, jsonify 
import requests
import json
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)



if __name__ == "__main__":
    app.run(debug=True)