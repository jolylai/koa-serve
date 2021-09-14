import Router from "@koa/router";
import FileController from "./controller/file";

const router = new Router({
  prefix: "/api",
});

// file
router.get("/file", FileController.upload);
router.post("/file/upload", FileController.upload);

export default router;
