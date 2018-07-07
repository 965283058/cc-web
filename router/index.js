let router=require('koa-router')()
const webSite=require('../app/controllers/webSite')

router.get('/list',webSite.list)


module.exports=router
