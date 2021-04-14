import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/implementations/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Bruno",
      password: "bbb111",
      email: "bruno@meuemail.com",
      drivers_license: "1234567890",
    };

    await createUserUseCase.execute({
      name: user.name,
      password: user.password,
      email: user.email,
      drivers_license: user.drivers_license,
    });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate a nonexistent user.", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "nobody@void.com",
        password: "idontexist",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to authenticate an incorrect password.", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Bruno",
        password: "bbb111",
        email: "bruno@meuemail.com",
        drivers_license: "1234567890",
      };

      await createUserUseCase.execute({
        name: user.name,
        password: user.password,
        email: user.email,
        drivers_license: user.drivers_license,
      });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
