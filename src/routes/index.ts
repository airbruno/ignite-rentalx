import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoryRoutes } from "./category.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use(authenticateRoutes);

export { router };
