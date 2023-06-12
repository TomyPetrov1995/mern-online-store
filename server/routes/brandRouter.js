import {Router} from "express";
import {upload} from "../multer.js";
import * as brandController from "../controllers/brandController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = new Router();

router.post("/",checkAuth,brandController.createBrand);
router.get("/",brandController.getAllBrands);
router.get("/:id",brandController.getOneBrand);

export default router;