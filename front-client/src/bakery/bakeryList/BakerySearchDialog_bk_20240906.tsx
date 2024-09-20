import React, { useEffect, useState } from "react";
import { BakeryDescription } from "../../types/TypeBakeryDescription";
import { BakerySearchQuery } from "../../types/TypeBakerySearchQuery"
import { BakeryGetApi } from "../../types/TypeBakeryGetApi"
import BakerySearch from "./BakerySearch";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HEADERS } from "../../const/ApiConst";

/*** API取得関連関数 ***************************************************************************/
// 検索用url作成
function buildSearchUrl(name: string, address: string, station: string, budget: string, openHours: string, hasWifi: string) {
    // const HEROKU_PROXY = "https://immense-atoll-08173.herokuapp.com/";
    const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
    const API_KEI = "ae3016f853d493ed"
    const large_area = "Z011"
    const conditions: string[] = [];
    conditions.push("&large_area=" + large_area);
    if(name) {
        conditions.push(`name=${name}`);
    }   
    if(address) {
        conditions.push(`address=${address}`);
    }
    if(station) {
        conditions.push(`station_name=${station}`);
    }
    if(budget) {
        conditions.push(`budget=${budget}`);
    }
    if(openHours) {
        conditions.push(`open=${openHours}`);
    }
    if(hasWifi) {
        conditions.push(`wifi=${hasWifi}`);
    }

        return url + API_KEI + conditions.join('&') 
}

function extractFromJson(json: any): BakeryGetApi[] {

    // jsonを解析
    const jsonObj = JSON.parse(json);
    const jsonBody = jsonObj.results;
    const shops: any[] =  jsonBody.shop; // 検索結果の複数の店
    const noImageIcon = "../no_image.png";

    return shops.map((shop: any) => {
        return {
            id: shop.id,
            name: shop.name.join(', '),
            address: shop.address ? shop.address.join(', ') : "",
            station: shop.station_name ? shop.station_name.join(', ') : "",
            lat: shop.lat ? shop.lat : "",
            lng: shop.lng ? shop.lng : "",
            budget: shop.budget.name ? shop.budget.name.join(', ') : "",
            totalSeats: shop.capacity ? shop.capacity.join(', ') : "",
            shopUrl_forPC: shop.urls.pc ? shop.urls.pc.join(', ') : "",
            photo_forPC: shop.photo.pc.s ? shop.photo.pc.s.join(', ') : noImageIcon,
            openHours: shop.open ? shop.open.join(', ') : "",
            closeDays: shop.close ? shop.close.join(', ') : "",
            hasWifi: shop.wifi ? shop.wifi.join(', ') : "",
            shop_memo: shop.shop_detail_memo ? shop.shop_detail_memo : "",
        }
    });
}

/**************************************************************************************/


type BakerySearchDialogProps = {
    maxResults: number;
    onBakeryAdd: (bakery: BakeryGetApi) => void;
}

const BakerySearchDialog = (props: BakerySearchDialogProps) => {
    // パン屋の検索
    //const [bakeriesForSearch, setBakeryForSearch] = useState([] as BakerySearchQuery[]);
    // パン屋の検索結果
    const [bakeriesResults, setBakeriesResults] = useState([] as BakeryGetApi[]);
    // パン屋検索の条件
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [station, setStation] = useState("");
    const [budget, setBudget] = useState("");
    const [openHours, setOpenHours] = useState("");
    const [hasWifi, setHasWifi] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const nameInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const addressInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };; 
    const stationInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStation(e.target.value);
    };
    const budgetInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value);
    };; 
    const openHoursInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenHours(e.target.value);
    };
    const hasWifiInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasWifi(e.target.value);
    };;    

    const searchClickHandler = () => {
        if (!name && !address && !station && !budget && !openHours && !hasWifi) {
            alert("検索条件を入力してください")
        }
        setIsSearching(true);
    };

    const bakeryAddHandler = (bakery: BakeryGetApi) => {
        props.onBakeryAdd(bakery);
    };

    const url = buildSearchUrl(name, address, station, budget, openHours, hasWifi);
    const parser = require('fast-xml-parser');

    async function main() {
        try {
            alert("★fetchします！"); 
            // let res = await fetch(url);
            // if (!res.ok) {
            //     console.log("resなし");
            //     throw new Error(`${res.status} ${res.statusText}`);
            // }
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            requestHeaders.set('Access-Control-Allow-Origin', HEADERS.ALLOWED_ORIGINS);
            requestHeaders.set('Access-Control-Allow-Methods', HEADERS.ALLOWED_METHODS.join(','));
            requestHeaders.set('Access-Control-Allow-Headers', HEADERS.ALLOWED_HEADERS.join(','));

            var header = {
                // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'Access-Control-Allow-Origin': HEADERS.ALLOWED_ORIGINS,
                'Access-Control-Allow-Methods': HEADERS.ALLOWED_METHODS.join(','),
                'Access-Control-Allow-Headers': HEADERS.ALLOWED_HEADERS.join(',')
            }

            let res = await fetch(url, {
                method: 'GET',
                // method: 'POST',
                mode: 'cors',
                headers: header
            }).then(res => {
                console.log("resあり");
                return res;
            }).catch(error => {
                console.log("resなし");
                return null;
            });
            let obj = null;
            if (res != null) {
                if (!res.ok) {
                    console.log("resなし");
                    throw new Error(`${res.status} ${res.statusText}`);
                }
    
                const xmlText = await res.text().then(res => {
                    var json = parser.toJson(xmlText);
                    obj = JSON.parse(json);
                    alert("★xmlns: " + obj.results.xmlns);
                    alert("★店舗名: " + obj.results.shop[0].name);
                    alert("★住所: " + obj.results.shop[0].address);
                });    
            }

            // const xmlText = await res.text();
            // var json = parser.toJson(xmlText);
            // const obj = JSON.parse(json);
            // alert("★xmlns: " + obj.results.xmlns);
            // alert("★店舗名: " + obj.results.shop[0].name);
            // alert("★住所: " + obj.results.shop[0].address);
            //alert("★" + extractFromJson(json));
            //setBakeriesResults(extractFromJson(json));
            // return res;
            return obj;
        } catch(err) {
            console.error(err);
            return 1;
        }
    }

    // API取得
    useEffect(() => {
        if(isSearching) {
//            const url = buildSearchUrl(name, address, station, budget, openHours, hasWifi);
            alert(url);
        // APIリクエストの結果を受けとる
        // ホットペッパーはXMLを返すので次のやり方でパースする
        // 参考：https://qiita.com/kouji0705/items/b3865f8aa5cde7320a0c
        // 成功した場合: .thenの処理   失敗した場合: .catchの処理        
            let response = main();
            alert("mainからの戻り値: " + response);
/*
            fetch(url) 
                .then((response) => {
                    // responseの取得
                    return response.text();
                })
                .then((xmlText) => {
                    //const fs = require('fs');
                    //const parser = require('xml2json');
            
                    // xml2json でxmlをjsonに変換してreturn
                    //return parser.toJson(xmlText);
                    //return parser.parse(xmlText);
                    alert("★" + xmlText);
                })
/*                .then((json) => {
                    // jsonをextractFromJson関数に渡す
                    return extractFromJson(json);
                })
                .then((bakeries) => {
                    setBakeriesResults(bakeries);
                })
                .catch((err) => {
                    console.error(err);
                });*/
        
        }
        setIsSearching(false);
        alert("isSearching: " + isSearching + "!");
    }, [isSearching]);

    const searchedBakeries = bakeriesResults.map((b, idx) => {
        return (
            <BakerySearch
                key={idx}
                description={b}
                onBakeryAdd={(b) => bakeryAddHandler(b)} 
            />
        );
    });

    return (
        <div className="dialog">
            <div className="operation">
                <div className="searchConditions">
                    <input 
                        type="text"
                        onChange={nameInputChangeHandler} 
                        placeholder="店名で検索"
                    />
                    <input
                        type="text"
                        onChange={addressInputChangeHandler} 
                        placeholder="住所で検索"
                    />
                    <input 
                        type="text"
                        onChange={stationInputChangeHandler} 
                        placeholder="駅名で検索"
                    />
                    <input
                        type="text"
                        onChange={budgetInputChangeHandler} 
                        placeholder="予算で検索"
                    />
                    <input 
                        type="text"
                        onChange={openHoursInputChangeHandler} 
                        placeholder="営業時間で検索"
                    />
                    <input
                        type="text"
                        onChange={hasWifiInputChangeHandler} 
                        placeholder="wifiの有無で検索"
                    />
                </div>
                <div className="button-like" onClick={searchClickHandler}>
                    Search
                </div>
            </div>
            <div className="seached-results">{searchedBakeries}</div>
        </div>
    );
}

export default BakerySearchDialog;