// 작성일 기준 프록시 설정하는 방법이 아래와 같이 변경되었습니다.
// 최신 방법이므로 사용하는데 문제가 없습니다.

// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8002',
            changeOrigin: true,
        })
    );
};