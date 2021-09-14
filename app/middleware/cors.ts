import { Context, Next } from "koa";

function cors() {
  return function (ctx: Context, next: Next) {
    console.log("ctx.method: ", ctx.method);
    if (ctx.method === "POST") {
    }
    // ctx.set("Access-Control-Allow-Methods", "GET,POST");
    next();
    ctx.set("Access-Control-Allow-Origin", "*");
  };
}

export default cors;
