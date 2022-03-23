import Koa from "koa";
import logger from "koa-logger";
import koaBody from "koa-body";
import server from "koa-static";
import cors from "@koa/cors";
import path from "path";

import router from "./routes";

const { PROT = 7077 } = process.env;

const app = new Koa();

// middleware
app.use(logger());
app.use(cors());

// file
app.use(koaBody({ multipart: true }));
app.use(server(path.join(__dirname, "/static")));

app.use(router.routes()).use(router.allowedMethods());

app.listen(PROT, () => {
  console.log(`server listen at: http://localhost:${PROT}`);
});
