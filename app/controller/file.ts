import { Context, Next } from "koa";
import fs from "fs";
import path from "path";

async function upload(ctx: Context, next: Next) {
  const files = ctx.request.files;

  const file = Array.isArray(files?.file) ? files?.file[0] : files?.file;

  if (!(file instanceof File)) {
    ctx.status = 400;

    ctx.body = {
      message: "请上传文件",
    };

    return;
  }

  const reader = fs.createReadStream(file.path);

  const stream = fs.createWriteStream(
    path.join(
      __dirname,
      "../../static",
      file.name || `${Math.random() * 100000} `
    )
  );

  reader.pipe(stream);

  console.log("uploading %s -> %s", file.name, stream.path);

  await next();

  ctx.status = 200;
  ctx.body = {
    fileUrl: file.name,
  };
}

function download(ctx: Context, next: Next) {}

export default {
  upload,
  download,
};
