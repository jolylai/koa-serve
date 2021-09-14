import Router from "@koa/router";
import FileController from "./controller/file";
import LoginController from "./controller/login";
import auth from "./middleware/auth";

const router = new Router({
  prefix: "/api",
});

router.use(auth());

// login
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);

// file
router.get("/file", FileController.upload);
router.post("/file/upload", FileController.upload);

export default router;
