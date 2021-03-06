const data = require('./data.json')

module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/carlist', function (req, res) {
                    res.json({
                        code: 1, // 模拟真实企业网络请求的权限问题
                        data: data.info
                    });
                });
            }
        }
    }
}