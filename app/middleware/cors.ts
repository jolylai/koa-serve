import { Context, Next } from "koa";

interface ICorsOptions {
  origin?: string | ((ctx: Context) => string | Promise<string>);
  credentials?: boolean | ((ctx: Context) => boolean | Promise<boolean>);
}

function cors(options: ICorsOptions) {
  return async function (ctx: Context, next: Next) {
    const requestOrigin = ctx.get("origin");

    if (!requestOrigin) return await next();

    let origin;

    if (typeof options.origin === "function") {
      origin = options.origin(ctx);

      if (origin instanceof Promise) {
        origin = await origin;
      }

      if (!origin) await next();
    } else {
      origin = options.origin || requestOrigin;
    }

    if (ctx.method === "OPTIONS") {
      ctx.set("Access-Control-Allow-Origin", origin);
    } else {
    }
    // ctx.set("Access-Control-Allow-Methods", "GET,POST");
    next();
  };
}

export default cors;
