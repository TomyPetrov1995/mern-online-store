import {Router} from "express";
import {upload} from "../multer.js";
import * as productController from "../controllers/productController.js";

const router = new Router();

router.post("/",upload.single("image"),productController.createProduct);
router.get("/",productController.getAllProducts);
router.get("/:id",productController.getOneProduct);
router.put("/:id",upload.single("image"),productController.updateProduct)

export default router;