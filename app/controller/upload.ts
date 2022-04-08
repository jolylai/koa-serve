import { Context, Next } from "koa";
import fs from "fs-extra";
import path from "path";
import aliOSS from "../utils/oss";

export default class UploadController {
  async local(ctx: Context, next: Next) {
    const files = ctx.request.files;

    if (!files) {
      throw new Error("Please upload file");
    }

    const { file } = files;

    if (!file) {
      throw new Error("Please upload file use file as key");
    }

    const outDir = path.resolve(__dirname, "../static/images/");
    fs.ensureDir(outDir);

    const uploadFiles = Array.isArray(file) ? file : [file];

    for (let file of uploadFiles) {
      const fileName = file.name || `${Math.random() * 100000} `;
      fs.move(file.path, path.join(outDir, fileName), {
        overwrite: true,
      });
    }

    ctx.body = {
      // fileUrl: file.name,
      message: "success",
    };
  }

  async oss(ctx: Context) {
    const files = ctx.request.files;

    if (!files) {
      throw new Error("Please upload file");
    }

    const { file } = files;

    if (!file) {
      throw new Error("Please upload file use file as key");
    }

    if (Array.isArray(file)) {
      const uploads = file.map((item) => {
        const fileName = item.name || `${Math.random() * 100000} `;
        return aliOSS.put(fileName, item.path);
      });

      const result = await Promise.all(uploads);

      // 删除本地文件
      file.forEach((item) => {
        fs.remove(item.path);
      });

      return (ctx.body = result);
    }

    const fileName = file.name || `${Math.random() * 100000} `;
    const result = await aliOSS.put(fileName, file.path);

    ctx.body = result;
  }

  download(ctx: Context, next: Next) {}
}
