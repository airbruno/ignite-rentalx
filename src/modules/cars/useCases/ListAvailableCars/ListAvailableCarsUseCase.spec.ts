import { CarsRepositoryInMemory } from "@modules/cars/repositories/implementations/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars.", async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: "Car 0",
      description: "Car description 0",
      daily_rate: 100.0,
      license_plate: "ABC000",
      fine_amount: 10.0,
      brand: "brand 0",
      category_id: "category_id0",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([availableCar]);
  });
  it("Should be available to list available cars by car name", async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description 1",
      daily_rate: 100.0,
      license_plate: "ABC001",
      fine_amount: 10.0,
      brand: "Brand 1",
      category_id: "category_id1",
    });

    // await carsRepositoryInMemory.create({
    //   name: "Car 2",
    //   description: "Car description 2",
    //   daily_rate: 100.0,
    //   license_plate: "ABC002",
    //   fine_amount: 10.0,
    //   brand: "Brand 2",
    //   category_id: "category_id2",
    // });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car 1" });

    expect(cars).toEqual([availableCar]);
  });
  it("Should be available to list available cars by brand name", async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description 3",
      daily_rate: 100.0,
      license_plate: "ABC003",
      fine_amount: 10.0,
      brand: "Brand 3",
      category_id: "category_id3",
    });
    // await carsRepositoryInMemory.create({
    //   name: "Car 4",
    //   description: "Car description 4",
    //   daily_rate: 100.0,
    //   license_plate: "ABC004",
    //   fine_amount: 10.0,
    //   brand: "Brand 4",
    //   category_id: "category_id4",
    // });
    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand 3" });

    expect(cars).toEqual([availableCar]);
  });
  it("Should be available to list available cars by category name", async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: "Car 5",
      description: "Car description 5",
      daily_rate: 100.0,
      license_plate: "ABC005",
      fine_amount: 10.0,
      brand: "Brand 5",
      category_id: "category_id5",
    });
    // await carsRepositoryInMemory.create({
    //   name: "Car 6",
    //   description: "Car description 6",
    //   daily_rate: 100.0,
    //   license_plate: "ABC006",
    //   fine_amount: 10.0,
    //   brand: "Brand 6",
    //   category_id: "category_id6",
    // });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id5",
    });

    expect(cars).toEqual([availableCar]);
  });
});
