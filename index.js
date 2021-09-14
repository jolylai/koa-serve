const fs = require("fs");
const util = require("util");
const path = require("path");
const Koa = require("koa");
const router = require("@koa/router")();

const cros = require("./app/middleware/cors");

const app = new Koa();

const access = util.promisify(fs.access);
const stat = util.promisify(fs.stat);

const exsits = async path => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};

router.get("/download/:filename", async ctx => {
  const { filename } = ctx.params;
  console.log("filename: ", ctx.acceptsEncodings);

  try {
    const filePath = path.resolve(__dirname, "./static/uploads", filename);
    const isExsists = await exsits(filePath);
    if (isExsists) {
      const stats = await stat(filePath);
      console.log("stats: ", stats);

      // 文件大小
      ctx.set("Content-Length", stats.size);

      // 缓存

      if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString())
      if (!ctx.response.get('Cache-Control')) {
        const directives = [`max-age=${(maxage / 1000 | 0)}`]
        if (immutable) {
          directives.push('immutable')
        }
        ctx.set('Cache-Control', directives.join(','))
      }
      if (!ctx.type) ctx.type = type(path, encodingExt)
    }

    ctx.set("Content-Disposition", `attachment; filename="${filename}"`);

    ctx.body = fs.createReadStream(filePath);
  } catch (error) {
    console.log("error: ", error);
    ctx.body = `${filename} 不存在`;
  }
});

router.get("/", ctx => {
  ctx.body = "hello";
});

app.use(cros()).use(router.routes());

app.listen(3000, () => {
  console.log(`start at http://localhost:${3000}`);
});
