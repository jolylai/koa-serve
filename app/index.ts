import Koa from "koa";

import config from "./config";
import router from "./routes";

const app = new Koa();

app.use(router.routes());

app.listen(config.port, () => {
  console.log(`server listen at: http://localhost:${config.port}`);
});
