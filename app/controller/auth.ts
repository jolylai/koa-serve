import crypto from "crypto";

import type { Context, Next } from "koa";

import { MS_IN_ONE_DAY, sign } from "../utils";
import User from "../service/user";

const userService = new User();

export default class Auth {
  async register(ctx: Context) {
    const { email, name, password } = ctx.request.body;
    const isEmailExist = await userService.findByEmail(email);

    if (isEmailExist) {
      throw new Error("Email already exist");
    }

    const verificationToken = crypto.randomBytes(40).toString("hex");

    const user = await userService.create({
      name,
      email,
      password,
      verificationToken,
    });

    ctx.body = user;
  }

  async verifyEmail(ctx: Context) {
    const { email, verificationToken } = ctx.request.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("Verification Failed");
    }

    if (user.verificationToken !== verificationToken) {
      throw new Error("Verification Failed");
    }

    user.isVerified = true;
    user.verified = new Date();
    user.verificationToken = null;

    await userService.update({
      where: { email },
      data: user,
    });

    ctx.body = { message: "Email verified" };
  }

  async login(ctx: Context, next: Next) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error("Invalid  Credentials");
    }

    if (!user.verified) {
      throw new Error("Please verify your email");
    }

    const token = sign(user);

    ctx.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
      expires: new Date(Date.now() + MS_IN_ONE_DAY),
    });

    ctx.body = { token };
  }

  async logout(ctx: Context, next: Next) {}
}
