import { Technologies } from ".prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import { TechnologyType } from "../mapper/tecnology.mapper";
import prisma from "../prisma";

class TechnologyService {
  async getTechnologies(): Promise<Technologies[]> {
    return await prisma.technologies.findMany();
  }

  async createTechnology(
    technologyData: TechnologyType
  ): Promise<Technologies> {
    const { name, type } = technologyData;

    if (!name || (name && !name.trim()) || name === undefined) {
      throw new HttpException(400, "name field is reqired");
    }

    if (!type) {
      throw new HttpException(400, "type field is reqired");
    }

    return await prisma.technologies
      .create({
        data: {
          name,
          type,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create technology");
      });
  }

  async updateTechnology(
    technologyData: Partial<TechnologyType>
  ): Promise<Technologies> {
    const { id, ...updatingData } = technologyData;
    const { name } = updatingData;

    if (name !== undefined && !name) {
      throw new HttpException(400, "name field cannot be empty");
    }

    return await prisma.technologies
      .update({
        where: {
          id,
        },
        data: updatingData,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update technology");
      });
  }

  async deleteTechnology(id: number): Promise<Technologies> {
    return await prisma.technologies
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "Technology is not found");
      });
  }
}

export default new TechnologyService();
