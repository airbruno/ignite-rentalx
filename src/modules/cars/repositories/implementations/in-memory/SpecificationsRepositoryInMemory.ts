import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }
  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = this.specifications.filter((spec) => ids.includes(spec.id));
    return specs;
  }
}

export { SpecificationsRepositoryInMemory };
