import { Context, Next } from "koa";
import fs from "fs";
import path from "path";

async function upload(ctx: Context, next: Next) {
  const files = ctx.request.files;
  const file = files?.file;

  if (!file) {
    ctx.status = 400;

    ctx.body = {
      message: "请上传文件",
    };

    return;
  }

  const reader = fs.createReadStream(file.path);

  const stream = fs.createWriteStream(
    path.join(__dirname, "../../static", file.name)
  );

  reader.pipe(stream);

  console.log("uploading %s -> %s", file.name, stream.path);

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
