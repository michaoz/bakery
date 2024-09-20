// Bakeryの検索条件
export type BakerySearchQuery = {
  name: string           // 店名
  address?: string
  station: string
//  keyword: string        // 店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)
  budget?: string         // 検索用平均ディナー予算コード。予算2個まで指定可。
  photo_forPC: string
  openHours?: string           // 営業時間　例：月～金／11：30～14：00
  hasWifi?: string           // wifi  例：あり、なし、未確認
}
