let router=require('koa-router')()
const webSite=require('../app/controllers/webSite')

router.get('/cc/list',webSite.list)


module.exports=router
