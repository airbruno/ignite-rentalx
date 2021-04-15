import { CarsRepositoryInMemory } from "@modules/cars/repositories/implementations/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/implementations/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });
  it("Should be able to create a car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 0",
      description: "Car description 0",
      daily_rate: 100.0,
      license_plate: "ABC000",
      fine_amount: 10.0,
      brand: "brand 0",
      category_id: "category_id0",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
  // it("Should not be able to create a existing car specification", () => {
  //   expect(async () => {
  //     await createCarSpecificationUseCase.execute();
  //   }).rejects.toBeInstanceOf(AppError);
  // });
  it("Should not be able to create a car specification for an inexistent car", () => {
    expect(async () => {
      const car_id = "12345";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
