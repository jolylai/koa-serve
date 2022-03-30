import Router from "@koa/router";

import Auth from "./controller/auth";
import Upload from "./controller/upload";
// import auth from "./middleware/auth";

const AuthController = new Auth();
const UploadController = new Upload();

const router = new Router({
  prefix: "/api",
});

// router.use(auth());

// login
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/verify-email", AuthController.verifyEmail);
// router.post("/logout", LoginController.logout);

// upload
router.post("/upload/image", UploadController.image);
// router.post("/file/upload", FileController.upload);

export default router;
