// APIから取得するBakery情報
export type BakeryGetApi = {
    id: string             // 店id
    name: string           // 店名
    address: string
    station: string
    lat: string,
    lng: string,
    budget: string         // 検索用平均ディナー予算コード。予算2個まで指定可。
    totalSeats: string     // 総席数
    shopUrl_forPC: string  // PC向けURL
    photo_forPC: string    // 店舗トップ写真(小）画像URL
    openHours: string
    closeDays: string
    hasWifi: string
    shop_memo: string
}
  