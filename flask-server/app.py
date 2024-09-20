from flask import Flask, request
from const import const
import requests
from service import handle_shop_data as serv

app = Flask(__name__)

URL = const.URL
API_KEY = const.API_KEI
LARGE_AREA = const.LARGE_AREA

@app.route("/getHotpepperApi", methods=["GET", "POST"], strict_slashes=False)
def get_hotpepper_api():
    params = request.get_json()
    print(f'[get_hotpepper_api]Received params from React: {params}')

    api_params = {
        "key": API_KEY,
        "keyword": params["keyword"],  # either is necessary
        "name": params["name"],     # either is necessary
        "address": params["address"],
        "budget": params["budget"]["name"],
        "wifi": params["wifi"],     # 0: unnecessary, 1: necessary
        "format": 'json',
        "count": 10
    }

    print(f"[get_hotpepper_api]parameters: {api_params}")
    response = requests.get(URL, params=api_params)
    res_json = response.json()
    print(f"[get_hotpepper_api]Results from API: {res_json}")
    # stores = res_json["results"]["shop"]
    # res_list = []
    # for store in stores:
    #     res_list.append(store)
    res_dict = serv.extract_data(res_json)

    return res_dict


if __name__ == "__main__":
    app.run(debug=True)