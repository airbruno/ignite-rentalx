import { CarsRepositoryInMemory } from "@modules/cars/repositories/implementations/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "car description",
      daily_rate: 100,
      license_plate: "1A2FSD",
      fine_amount: 20,
      brand: "Brand name",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to create a car with an existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        description: "car description",
        daily_rate: 100,
        license_plate: "1A2FSD",
        fine_amount: 20,
        brand: "Brand name",
        category_id: "category",
      });
      await createCarUseCase.execute({
        name: "Car name",
        description: "car description",
        daily_rate: 100,
        license_plate: "1A2FSD",
        fine_amount: 20,
        brand: "Brand name",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to set default value for available as true", async () => {
    const car = await createCarUseCase.execute({
      name: "Available car",
      description: "car description",
      daily_rate: 100,
      license_plate: "1A2FSD",
      fine_amount: 20,
      brand: "Brand name",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
