import { Context, Next } from "koa";

async function login(ctx: Context, next: Next) {
  const { userName, password } = ctx.request.body;
  console.log("login: ", { userName, password });

  ctx.body = {
    token: "token",
  };
}

async function logout(ctx: Context, next: Next) {}

export default {
  login,
  logout,
};
