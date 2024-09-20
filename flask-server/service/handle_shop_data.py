import sys, os, json
# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from data import data_format_api_res as dfar
from const import const

def extract_data(res_json: json) -> dict[str, dict[str, dict[str, any]]]:
    extracted_res = dfar.api_res.copy()
    shop_list = []
    shop_cnt = 0

    for res_results_shop in res_json["results"]["shop"]:
        # copy the foramt and create a template
        res_results_shop_template = dfar.api_res_results_shop.copy()
        if shop_cnt >= const.API_SHOP_CNT_MAX:
            # More than 5 results are not needed, so end the loop.
            break
        for track_first in dfar.track_api_res_results_shop:
            if (idx:=track_first.find(".")) >= 0:
                # if it's a nested array, get the next dimension(2nd is maximum).
                track_second = track_first[(idx + 1):]
                track_first = track_first[:idx]
                # put api response value into the template 
                res_results_shop_template[track_first][track_second] = res_results_shop[track_first][track_second]
            else:
                # put api response value into the template
                res_results_shop_template[track_first] = res_results_shop[track_first]
        shop_list.append(res_results_shop_template)
        shop_cnt += 1

    extracted_res["results"]["shop"] = shop_list

    return extracted_res