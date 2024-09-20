export type typeSelectedShop = {
    "selected": {
        "selectedShop": {
            "name": string,
            "mesh": number,
            "coordinates": [number, number],
            "data": {
                "id": number,
                "address": string,
                "station": string,
                "budget": string,
                "openHours": string,
                "closeDays": string
            }    
        }
    },
    "groups": {
        // "shopGroups": {
        //     "fav": string,
        //     "tg": string
        // },
        "shopGroups": {
            "fav": {
                "title": string,
                "list": string[],
                "openFlg": boolean
            },
            "tag": {
                "title": string,
                "list": string[],
                "openFlg": boolean
            }
        },
    }
    "selectedGrouped": {
        "groupedShop": {
            "favourite": string[],
            "toGo": string[]
        }
    }
}