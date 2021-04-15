import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  image_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}
  async execute({ car_id, image_names }: IRequest): Promise<void> {
    image_names.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImageUseCase };
