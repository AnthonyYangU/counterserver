const Koa = require('koa')
const router = require('./router')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const tcpserver = require('./tcpserver')

app.use(bodyParser({ multipart: true }))

router(app);
tcpserver();
app.listen(4002)

console.log('app started at port 4002')
