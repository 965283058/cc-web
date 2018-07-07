const koa = require('koa2');
let app = new koa();
const router = require('./router/index')
 const path = require('path')
const koaBody = require('koa-body')
const queryString = require('./app/utils/queryString')
const session = require('koa-generic-session')






app.use(koaBody({multipart: true}))
app.use(queryString)
app.keys = ['some secret hurr'];

app.use(session({
    key: 'jmAdminSid',
    maxAge: (1000 * 60 * 60 * 2),//2小时session超时
    overwrite: false,
    httpOnly: true,
    rewrite: true,
    signed: true
}, app));





app.use(async(ctx, next)=> {
    ctx.serverOrigin = ''
    // ctx.serverOrigin = prod ? '' : "http://127.0.0.1:9999";
    await next()
})

app.use(router.routes(), router.allowedMethods())

// let prot = prod ? 80 : 9999;
app.listen(9999);