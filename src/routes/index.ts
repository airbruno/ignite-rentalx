import { Router } from "express";

import { categoryRoutes } from "./category.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationsRoutes);

export { router };
