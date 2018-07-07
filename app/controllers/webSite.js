const db = require("../db/Schema");
const fs = require("fs")
const path = require("path")

module.exports.eos = async(ctx, next)=> {
    let key = ctx.request.body.key
    let detail = path.join(process.cwd(), '/view/default.html')
    if (key) {
        let exists = await db.List.findOne({key: key})
        if (exists) {
            await render(ctx, path.join(process.cwd(), '/view/detail.html'))
        } else {
            await render(ctx, detail)
        }
    } else {
        await render(ctx, detail)
    }
}

module.exports.manage = async(ctx, next)=> {

    if (!checkUser(ctx.request.body)) {
        ctx.body = 404
        return
    }
    await render(ctx, path.join(process.cwd(), '/view/manage.html'))
}

module.exports.list = async(ctx, next)=> {
    if (!checkUser(ctx.request.body)) {
        ctx.body = 404
        return
    }
    let page = Number.parseInt(ctx.request.body.page) || 1
    let rows = Number.parseInt(ctx.request.body.rows) || 1
    let total = await db.List.count()

    let list = await db.List.find().limit(rows).skip((page - 1) * rows)
    if (list instanceof Array) {
        ctx.body = {"status": 0, "message": "", data: {page: page, rows: list, total: total}}
    } else {
        ctx.body = {"status": 10, "message": "查询出错:" + list}
    }
}


module.exports.add = async(ctx, next)=> {
    if (!checkUser(ctx.request.body)) {
        ctx.body = 404
        return
    }
    let key = ctx.request.body.key
    if (!key) {
        ctx.body = {"status": 5, "message": "key not is null"}
        return
    }

    try {
        let m = new db.List({key: key})
        await m.save()
        ctx.body = {"status": 0, "message": ""}
    } catch (e) {
        ctx.body = {"status": 10, "message": e.message}
    }
}


function checkUser(params) {
    if (params.user == "liucc" && params.pwd == "123") {
        return true
    } else {
        return false
    }
}


function render(ctx, path) {
    return new Promise((rev, rej)=> {
        let stream = fs.createReadStream(path);
        stream.on("open", function (length) {
            stream.pipe(ctx.res);
        })
        stream.on("error", function (err) {
            ctx.body = err;
            rej()
        });
        stream.on("end", function (err) {
            rev()
        });
    })
}






