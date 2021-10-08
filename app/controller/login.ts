import { Context, Next } from "koa";

async function login(ctx: Context, next: Next) {
  const { userName, password } = ctx.request.body;
  console.log("login: ", { userName, password });

  const token = "ce032b305a9bc1ce0b0dd2a";

  ctx.cookies.set("koa", token, {
    domain: ctx.headers.origin,
    httpOnly: false,
    // sameSite: "none",
  });

  ctx.body = { token };
}

async function logout(ctx: Context, next: Next) {}

export default {
  login,
  logout,
};
