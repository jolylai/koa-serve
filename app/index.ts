import Koa from "koa";
import logger from "koa-logger";
import koaBody from "koa-body";
import server from "koa-static";
import cors from "@koa/cors";
import path from "path";

import config from "./config";
import router from "./routes";

const app = new Koa();

// middleware
app.use(logger());
app.use(cors());

// file
app.use(koaBody({ multipart: true }));
app.use(server(path.join(__dirname, "/static")));

app.use(router.routes());

app.listen(config.port, () => {
  console.log(`server listen at: http://localhost:${config.port}`);
});
