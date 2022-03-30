import { Context, Next } from "koa";
import fs from "fs-extra";
import path from "path";

// const saveFileLocal = async (file: File, filePath: string) => {
//   const reader = fs.createReadStream(file.path);
//   console.log("file.path: ", file.path);

//   const fileName = file.name || `${Math.random() * 100000} `;
//   const stream = fs.createWriteStream(path.join(filePath, fileName));

//   reader.pipe(stream);
// };

export default class UploadController {
  async image(ctx: Context, next: Next) {
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
  download(ctx: Context, next: Next) {}
}
