import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/ListSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.post("/", createSpecificationController.handle);
specificationRoutes.get("/", listSpecificationsController.handle);

export { specificationRoutes };
