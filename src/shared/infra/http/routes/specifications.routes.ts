import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/ListSpecifications/ListSpecificationsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.post("/", createSpecificationController.handle);
specificationRoutes.get("/", listSpecificationsController.handle);

export { specificationRoutes };
