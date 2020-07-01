const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/tm/api',
    createProxyMiddleware({
      target: 'https://www.easy-mock.com/mock/5d11904204f0047bfd1c9bc3/tm/api',
      pathRewrite: {
        '^/tm/api': '/'
      },
      changeOrigin: true
    })
  );
};