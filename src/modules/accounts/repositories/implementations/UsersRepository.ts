import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      drivers_license,
    });

    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });

    return user;
  }
}

export { UsersRepository };
