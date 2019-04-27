
const baseCfg = {
    port: 8001,
    apiPrefix: 'api',
    mongodb: {
        url: 'mongodb://test:test@123.206.25.28:27017/test',
        options: {
            useNewUrlParser: true,
            poolSize: 10
        }
    },
    swaggerConfig: {
        title: 'Swagger Test'
    },
    jwt: {
        secret: 'bus',
        excludeUrls: [
            '/api/user/register',
            /\/user\/login/,
            {url: /\user$/, methods: ['GET']}
        ]
    }
}

const cfg = {
  test: { // 开发
    port: 8001,
  },
  pro: { // 发布
    port: 3000,
  },
}

module.exports = Object.assign(baseCfg, cfg[process.env.PRO_ENV] || {})
