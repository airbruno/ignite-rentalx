import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new Error("User already created!");
    }

    this.usersRepository.create({
      name,
      username,
      password,
      email,
      drivers_license,
    });
  }
}

export { CreateUserUseCase };
