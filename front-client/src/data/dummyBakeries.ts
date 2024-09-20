import { BakeryData } from '../types/TypeBakeryData';

const dummyBakeries: BakeryData[] = [
    {
      id: 'J999999999',
      name: 'The City Bakery - Tokyo Shinagawa',
      address: '東京都港区港南2-18-1アトレ品川2階',
      station: '品川駅',
      budget: '[夜]￥2,000～￥2,999',
      totalSeats: '100席',
      shopUrl_forPC: 'https://thecitybakery.jp/shop/shinagawa_restaurant.html',
      photo_forPC: 'url',
      openHours: '10:00-20:00',
      closeDays: '水',
      hasWifi: '',
      shop_memo: '',
      user_memo: 'aaaaaaaaaaaaa',
    },
    {
      id: 'I333330000',
      name: 'Maison Landemaine',
      address: '東京都港区麻布台３－１－５',
      station: '六本木駅',
      budget: 'ランチ：1500円／ディナー：2000円',
      totalSeats: '34席(別でテラス席16席有り)',
      shopUrl_forPC: 'https://www.maisonlandemainejapon.com/',
      photo_forPC: 'url',
      openHours:
        '月～日、祝日、祝前日: 07:00～19:30【平日ランチタイム】11:30～14:00【土日祝ブランチタイム】11:00～14:30上記時間帯以外のご予約は承りかねますので、ご了承くださいませ。また、物販の商品(カフェ利用を含む)のみを店内で飲食される場合もご予約は承りかねます。',
      closeDays:
        '不定休\nコロナの影響で。8:00～18:30の時短営業とさせていただいております。',
      hasWifi: 'あり',
      shop_memo: 'テラス席のみペット同伴可',
      user_memo: 'bbbbbbbbbbbbbbbbbbbb',
    },
    {
      id: 'O111666666',
      name: 'Ｂｏｕｌａｎｇｅｒｉｅ・Ｐａｔｉｓｓｅｒｉｅ・ＢＲＡＳＳＥＲＩＥ・ＶＩＲＯＮ・渋谷店',
      address: '東京都渋谷区宇田川町33-8塚田ビル1・2階',
      station: '上泉駅',
      budget: '[夜]～￥999',
      totalSeats: '',
      shopUrl_forPC: 'shop_url',
      photo_forPC: '',
      openHours: '09:00～22:00',
      closeDays: '',
      hasWifi: '',
      shop_memo: '',
      user_memo: '',
    },  
  ]

export default dummyBakeries;