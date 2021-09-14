import { Context, Next } from "koa";

function cors() {
  return function (ctx: Context, next: Next) {
    // ctx.set("Access-Control-Allow-Methods", "GET,POST");
    next();
    ctx.set("Access-Control-Allow-Origin", "*");
  };
}

module.exports = cors;
