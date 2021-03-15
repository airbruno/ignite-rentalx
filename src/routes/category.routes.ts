import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoryRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoryRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category already exists!" });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoryRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoryRoutes };
