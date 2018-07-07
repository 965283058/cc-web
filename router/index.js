let router = require('koa-router')()
const webSite = require('../app/controllers/webSite')

router.get('/cc/eos', webSite.eos)
router.get('/cc/list', webSite.list)
router.get('/cc/manage', webSite.manage)
router.post('/cc/add', webSite.add)

module.exports = router
