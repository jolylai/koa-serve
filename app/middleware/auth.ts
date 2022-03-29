import { verify } from "../utils";
import type { Context, Next } from "koa";

function auth() {
  return async function (ctx: Context, next: Next) {
    const authHeader = ctx.get("Authorization");

    if (!authHeader || authHeader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];
    console.log("token: ", token);

    try {
      const user = verify(token);

      ctx.request.body.user = user;

      await next();
    } catch (error) {
      throw error;
    }
  };
}

export default auth;
