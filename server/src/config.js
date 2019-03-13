
const baseCfg = {
    port: 8001,
    apiPrefix: 'api',
    mongodb: {
        url: 'mongodb://test:test@localhost:27017/test',
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
            /\/user\/login/,
            {url: '/api/user/register', methods: ['POST']}
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

export default Object.assign(baseCfg, cfg[process.env.PRO_ENV] || {})
