# Flask is module that allows to write python service which can run as http request
from flask import Flask, request, jsonify
import util

app = Flask(__name__)

# Way of exposing http end point
@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    location = request.form['location']
    stanje = bool(request.form['stanje'])
    broj_kvadrata = float(request.form['broj_kvadrata'])
    sprat = int(request.form['sprat'])
    namjesten = int(request.form['namjesten'])
    broj_soba = int(request.form['broj_soba'])
    grijanje = int(request.form['grijanje'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, stanje, broj_kvadrata, sprat, namjesten, broj_soba,
                                                    grijanje)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)
