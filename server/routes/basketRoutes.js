import {Router} from "express";
import checkAuth from "../middlewares/checkAuth.js";
import * as basketController from "../controllers/basketController.js";

const router = new Router();

router.post("/",checkAuth,basketController.create);
router.get("/",checkAuth,basketController.getBasket);
router.post("/add",checkAuth,basketController.addProduct);
router.put("/add",checkAuth,basketController.updateProduct);
router.delete("/:id",checkAuth,basketController.removeProduct)
export default router;