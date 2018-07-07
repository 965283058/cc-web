const db = require("../db/Schema");
const fs = require("fs")
const path=require("path")

module.exports.list = async(ctx, next)=> {
    let key = ctx.request.body.key
    if(key){
        let list = await db.List.findOne({key: key})
        await render(ctx,path.join(process.cwd(),'/view/index.html'))
    }else{
        ctx.status=404
    }
}

function render(ctx,path) {
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






