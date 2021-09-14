import Router from "@koa/router";
import FileController from "./controller/file";

const router = new Router({
  prefix: "/api",
});

// file
router.post("/file/upload", FileController.upload);
// router.get("/file", FileController.upload);

export default router;
