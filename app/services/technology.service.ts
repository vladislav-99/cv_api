import { Technologies } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import {
  TechnologyCreateDTO,
  TechnologyUpdateDTO,
} from "../mappers/types/technology.types";
import prisma from "../prisma";
import TechnologyRepository from "../repositories/technology.repository";

class TechnologyService {
  async getTechnologies(): Promise<Technologies[]> {
    return await prisma.technologies.findMany();
  }

  async createTechnology(
    technologyData: TechnologyCreateDTO
  ): Promise<Technologies> {
    const technologyRepository = new TechnologyRepository();

    return await technologyRepository
      .createTechnology(technologyData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create technology");
      });
  }

  async updateTechnology(
    technologyData: TechnologyUpdateDTO
  ): Promise<Technologies> {
    const technologyRepository = new TechnologyRepository();

    return await technologyRepository
      .updateTechnology(technologyData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update technology");
      });
  }

  async deleteTechnology(id: number): Promise<Technologies> {
    const technologyRepository = new TechnologyRepository();

    return await technologyRepository.deleteTechnology(id).catch((err) => {
      console.log(err);
      throw new HttpException(404, "Technology is not found");
    });
  }
}

export default new TechnologyService();
