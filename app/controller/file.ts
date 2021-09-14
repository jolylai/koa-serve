import { Context } from "koa";

export function upload(ctx: Context) {
  ctx.body = "file";
}

export default {
  upload,
};
