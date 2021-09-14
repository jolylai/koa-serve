import { Context, Next } from "koa";

function auth() {
  return async function (ctx: Context, next: Next) {
    const token = ctx.get("Authorization");

    if (token) {
      ctx.status = 403;
      ctx.body = "Forbidden";
      return;
    }
    console.log("token: ", token);

    await next();
  };
}

export default auth;
