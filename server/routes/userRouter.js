import {Router} from "express";
import * as userController from "../controllers/userController.js";
import {upload}from "../multer.js";
import checkAuth from "../middlewares/checkAuth.js";
import {registerValidation} from "../errors/errorsValidation.js";
import {handleErrors} from "../middlewares/handleErrors.js";

const router = new Router();

router.post("/register",registerValidation,handleErrors,upload.single("avatar"),userController.register);
router.post("/login",userController.login);
router.get("/me",checkAuth,userController.check);
router.put("/update/:id",checkAuth,upload.single("avatar"),userController.updateUser);

export default router;