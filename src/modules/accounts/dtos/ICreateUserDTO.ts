interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  drivers_license: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
