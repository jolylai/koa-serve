// import jwt from "jsonwebtoken";
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
      // process.env.JWT_SECRET
      // const { id, name } = jwt.verify(token, "JWT_SECRET");

      // ctx.request.user = { id, name };

      await next();
    } catch (error) {
      throw error;
    }
  };
}

export default auth;
