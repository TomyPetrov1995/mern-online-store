import {Router} from "express";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import basketRoutes from "./basketRoutes.js";
import brandRouter from "./brandRouter.js";

const router = new Router();

router.use("/auth",userRouter);
router.use("/categories",categoryRouter);
router.use("/brands",brandRouter);
router.use("/products",productRouter);
router.use("/basket",basketRoutes);

export default router;