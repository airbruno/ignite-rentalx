import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoryRoutes = Router();

categoryRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoryRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

export { categoryRoutes };
