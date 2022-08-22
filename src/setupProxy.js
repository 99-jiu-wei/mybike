const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/v7',
        createProxyMiddleware({
            target: 'https://devapi.qweather.com',
            changeOrigin: true,
        })
    );
};