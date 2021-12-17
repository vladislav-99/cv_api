import {
  TechnologyCreateEty,
  TechnologyUpdateEty,
} from '../mappers/types/technology.types';
import prisma from '../prisma';

export default class TechnologyRepository {
  async createTechnology(data: TechnologyCreateEty) {
    return await prisma.technologies.create({
      data,
    });
  }

  async updateTechnology({ id, ...data }: TechnologyUpdateEty) {
    return await prisma.technologies.update({
      where: {
        id,
      },
      data,
    });
  }

  async getTechnologies(skip?: number, take?: number) {
    return await prisma.technologies.findMany({
      skip,
      take,
    });
  }

  async getTechnology(id: number) {
    return await prisma.technologies.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteTechnology(id: number) {
    return await prisma.technologies.delete({ where: { id } });
  }
}
