import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create(car_id: string, image_names: string): Promise<CarImage>;
}

export { ICarImagesRepository };
