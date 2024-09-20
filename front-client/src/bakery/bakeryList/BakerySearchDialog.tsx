'use client'

import { PythonProvider } from 'react-py'
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BakeryDescription } from "../../types/TypeBakeryDescription";
import { BakerySearchQuery } from "../../types/TypeBakerySearchQuery"
import { BakeryGetApi } from "../../types/TypeBakeryGetApi"
import BakerySearch from "./BakerySearch";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HEADERS } from "../../const/ApiConst";


/**CSS *******************************************/
const DivSearchedResult = styled.div`
    border: 1px solid #fff;
    margin: 20px 10px;  
    padding: 0px 20px;
`
const DivSearchedResultTitle = styled.div`
    color: #fff;
    font-weight: bold;
    font-size: 1.5em;
    margin: 10px 0px;
`
const PWifi = styled.p`
    margin-left: 10px;
`
const InputWifi = styled.input`
    margin-top: -43px;
    margin-left: -170px !important;
`
/**CSS end****************************************/

/*** API取得関連関数 ***************************************************************************/
// 検索用url作成
// function buildSearchUrl(name: string, address: string, station: string, budget: string, openHours: string, hasWifi: string) {
function buildSearchUrl(keyword: string, name: string, address: string, budget: string, hasWifi: number) {
    // const HEROKU_PROXY = "https://immense-atoll-08173.herokuapp.com/";
    const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
    const API_KEI = "ae3016f853d493ed"
    const large_area = "Z011"
    const conditions: string[] = [];
    conditions.push("&large_area=" + large_area);
    if(keyword) {
        conditions.push(`keyword=${keyword}`);
    }   
    if(name) {
        conditions.push(`name=${name}`);
    }   
    if(address) {
        conditions.push(`address=${address}`);
    }
    // if(station) {
    //     conditions.push(`station_name=${station}`);
    // }
    if(budget) {
        conditions.push(`budget=${budget}`);
    }
    // if(openHours) {
    //     conditions.push(`open=${openHours}`);
    // }
    if(hasWifi) {
        conditions.push(`wifi=${hasWifi}`);
    }

        return url + API_KEI + conditions.join('&') 
}

// function extractInfoFromJson(json: any): BakeryGetApi[] {
// function extractInfoFromJson(jsonStr: string): BakeryGetApi[] {
function extractInfoFromJson(jsonStr: string, searchingCnt: number): BakeryGetApi[] {

    const jsonObj = JSON.parse(jsonStr);  // parse jsonStr and get json
    const jsonBody = jsonObj.results;
    const shops: any[] =  jsonBody.shop;  // 検索結果の複数の店
    const noImageIcon = "../no_image.png";

    return shops.map((shop: any, idx: number) => {
        return {
            // Combine id with searchingCnt and idx to make it unique. 
            id: shop.id + searchingCnt.toString() + idx.toString(),
            // id: shop.id,
            name: shop.name,
            address: shop.address ? shop.address : "",
            station: shop.station_name ? shop.station_name : "",
            lat: shop.lat ? shop.lat : "",
            lng: shop.lng ? shop.lng : "",
            budget: shop.budget.name ? shop.budget.name : "",
            totalSeats: shop.capacity ? shop.capacity : "",
            shopUrl_forPC: shop.urls.pc ? shop.urls.pc : "",
            photo_forPC: shop.photo.pc.s ? shop.photo.pc.s : noImageIcon,
            openHours: shop.open ? shop.open : "",
            closeDays: shop.close ? shop.close : "",
            hasWifi: shop.wifi ? shop.wifi : "",
            shop_memo: shop.shop_detail_memo ? shop.shop_detail_memo : "",
        }
        // return {
        //     id: shop.id,
        //     name: shop.name.join(', '),
        //     address: shop.address ? shop.address.join(', ') : "",
        //     station: shop.station_name ? shop.station_name.join(', ') : "",
        //     budget: shop.budget.name ? shop.budget.name.join(', ') : "",
        //     totalSeats: shop.capacity ? shop.capacity.join(', ') : "",
        //     shopUrl_forPC: shop.urls.pc ? shop.urls.pc.join(', ') : "",
        //     photo_forPC: shop.photo.pc.s ? shop.photo.pc.s.join(', ') : noImageIcon,
        //     openHours: shop.open ? shop.open.join(', ') : "",
        //     closeDays: shop.close ? shop.close.join(', ') : "",
        //     hasWifi: shop.wifi ? shop.wifi.join(', ') : "",
        //     shop_memo: shop.shop_detail_memo ? shop.shop_detail_memo : "",
        // }
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
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [station, setStation] = useState("");
    const [budget, setBudget] = useState("");
    const [openHours, setOpenHours] = useState("");
    const [hasWifi, setHasWifi] = useState(0);
    // The counter of the number of searching
    const [searchingCnt, setSearchingCnt] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    const keywordInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const nameInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const addressInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };
    const stationInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStation(e.target.value);
    };
    const budgetInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value);
    };
    const openHoursInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenHours(e.target.value);
    };
    const hasWifiInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasWifi(e.target.checked ? 1 : 0);
    };

    const searchClickHandler = () => {
        if (!keyword && !name) {
            alert("Please input either keyword or name at least.")
        }
        setIsSearching(true);
        // Increment the counter of searching
        setSearchingCnt(prevSate => prevSate + 1);
    };

    const bakeryAddHandler = (bakery: BakeryGetApi) => {
        props.onBakeryAdd(bakery);
    };

    // const url = buildSearchUrl(name, address, station, budget, openHours, hasWifi);
    const url = buildSearchUrl(keyword, name, address, budget, hasWifi);
    const xmlParser = require('fast-xml-parser');

    async function getHotpepperApi(parameters: {[key: string]: string | any}) {
        try {
            // get hotpepper api res from Python
            // const res: string = await fetch("/getHotpepperApi", {
            const res: string = await fetch("/getHotpepperApi", {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(parameters),
            }).then(res => res.json()
            ).then(res => {
                console.log(res);
                return res;
            }).catch(error => {
                console.log(error);
                throw new Error(`${error.status} ${error.statusText}`)
                return null;
            });

            // if (res == null) {
            //     console.log("NO res");
            //     throw new Error(`${res.status} ${res.statusText}`)
            // }

            // results.shop が空白（shopリストの要素がない）の場合の対処を考える
            const jsonStr = JSON.stringify(res);
            // const extractedInfo = extractInfoFromJson(jsonStr);
            const extractedInfo = extractInfoFromJson(jsonStr, searchingCnt);
            setBakeriesResults(extractedInfo);
            return res;
        } catch(err) {
            console.error(err);
            return 1;
        }
    }

    // API取得
    useEffect(() => {
        if(isSearching) {
            console.log(url);
            // const url = buildSearchUrl(name, address, station, budget, openHours, hasWifi);
            // APIリクエストの結果を受けとる
            // ホットペッパーはXMLを返すので、それを利用する場合は次のやり方でパースする。
            // 参考：https://qiita.com/kouji0705/items/b3865f8aa5cde7320a0c
            // 成功した場合: .thenの処理   失敗した場合: .catchの処理

            let parameters: {[key: string]: string | any} = {
                "keyword": keyword, // either is necessary
                "name": name,     // either is necessary
                "address": address,
                "budget": {
                    "name": budget,
                },
                "wifi": hasWifi,
            };

            // search Hotpepper api for places' info
            (async() => {
                await getHotpepperApi(parameters);
            })()
        }
        setIsSearching(false);
        console.log("isSearching: " + isSearching);
    }, [isSearching]);

    const searchedBakeries = bakeriesResults.map((b, idx) => {
        return (
            <BakerySearch
                key={b.id}
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
                        onChange={keywordInputChangeHandler} 
                        placeholder="Search by keyword"
                    />
                    <input 
                        type="text"
                        onChange={nameInputChangeHandler} 
                        placeholder="Search by name of the store"
                    />
                    <input
                        type="text"
                        onChange={addressInputChangeHandler} 
                        placeholder="Search by address"
                    />
                    <input
                        type="text"
                        onChange={budgetInputChangeHandler} 
                        placeholder="Search by budget"
                    />
                    <PWifi>Wi-Fi</PWifi>
                    <InputWifi
                        // type="text"
                        type="checkbox"
                        onChange={hasWifiInputChangeHandler} 
                        placeholder="Search by wifi availability"
                    />
                </div>
                <div className="button-like" onClick={searchClickHandler}>
                    Search
                </div>
            </div>
            <DivSearchedResult className="seached-results">
                <DivSearchedResultTitle>Seached Results</DivSearchedResultTitle>
                {searchedBakeries}
            </DivSearchedResult>
        </div>
    );
}

export default BakerySearchDialog;