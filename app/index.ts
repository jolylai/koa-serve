import Koa from "koa";
import logger from "koa-logger";
import koaBody from "koa-body";
import server from "koa-static";
import cors from "@koa/cors";
import path from "path";

import router from "./routes";

const { PORT } = process.env;

const app = new Koa();

app.keys = ["secret", "key"];

// middleware
app.use(logger());
app.use(cors());

// file
app.use(koaBody({ multipart: true }));

// static server
const staticPath = path.join(__dirname, "/static");

app.use(
  server(staticPath, {
    setHeaders(res, path, stats) {
      console.log("res, path, stats: ", res, path, stats);
      // res.setHeader("Content-Disposition", "attachment; filename=download.jpg");
    },
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server listen at: http://localhost:${PORT}`);
});
