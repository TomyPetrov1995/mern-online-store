import {Router} from "express";
import {upload} from "../multer.js";
import * as categoryController from "../controllers/categoryController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = new Router();

router.post("/",checkAuth,upload.single("image"),categoryController.createCategory);
router.get("/",categoryController.getAllCategories);
router.get("/:id",categoryController.getOneCategory);

export default router;