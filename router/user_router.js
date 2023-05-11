import Router from "express";
import { registrUser } from "../controller/registr.js";
import { loginUser } from "../controller/login.js";
import {
  getUsers,
  getUser,
  profelUserUpdate,
  coverImagesUpdate,
  signOutUser,
  postUser,
  getPosts,
} from "../controller/users.js";
import { laykPost } from "../controller/layk.js";

import {
  userRegistValidation,
  userLogiValidation,
  userPosValidation,
} from "../middleware/user_validation_middleware.js";
const router = Router();

router.post("/registr", userRegistValidation, registrUser);
router.post("/login", userLogiValidation, loginUser);
router.get("/users", getUsers);
router.get("/user", getUser);
router.post("/profel_images_update", profelUserUpdate);
router.post("/cover_images_update", coverImagesUpdate);
router.get("/sign_out", signOutUser);
router.post("/post", userPosValidation, postUser);
router.get("/posts", getPosts);

router.post("/like", laykPost);

export default router;
