export const HEADERS = {
    ALLOWED_METHODS: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        //'HEAD',
        'OPTIONS'
    ],
    // ALLOWED_ORIGINS: "https://webservice.recruit.co.jp",
    ALLOWED_ORIGINS: "http://localhost:3000",
    ALLOWED_HEADERS: [
        //"Accept, Content-Type, Content-Length, Accept-Encoding, X-Requested-With, Origin, X-Csrftoken, X-CSRF-Token, Authorization"
        'Content-type',  // デフォルトで許可だが、追加の制約の適用回避のために記述。
        'Accept',  // デフォルトで許可だが、追加の制約の適用回避のために記述。
        'X-Custom-Header'  // カスタムヘッダー
    ]
}
