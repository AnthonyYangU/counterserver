const Koa = require('koa')
const router = require('./router')
const app = new Koa()

const bodyParser = require('koa-bodyparser')

app.use(bodyParser({multipart:true}))

router(app);

app.listen(4002)

console.log('app started at port 4002')
