import {
  EducationCreateEty,
  EducationUpdateEty,
} from '../mappers/types/education.types';
import prisma from '../prisma';

export default class EducationRepository {
  async createEducation(data: EducationCreateEty) {
    return await prisma.education.create({
      data,
    });
  }

  async createManyEducations(data: EducationCreateEty[]) {
    return await prisma.education.createMany({
      data,
      skipDuplicates: true
    });
  }

  async getLastCreatedEducations(count: number) {
    return await prisma.education.findMany({
      take: count,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async updateEducation({ id, ...data }: EducationUpdateEty) {
    return await prisma.education.update({
      where: {
        id,
      },
      data,
    });
  }

  async getEducations(skip?: number, take?: number) {
    return await prisma.education.findMany({
      skip,
      take,
    });
  }

  async getEducation(id: number) {
    return await prisma.education.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteEducation(id: number) {
    return await prisma.education.delete({ where: { id } });
  }
}
