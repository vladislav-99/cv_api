import {
  ExperienceCreateEty,
  ExperienceUpdateEty,
} from '../mappers/types/experience.types';
import prisma from '../prisma';

export default class ExperienceRepository {
  async createExperience(data: ExperienceCreateEty) {
    return await prisma.work_experience.create({
      data,
    });
  }

  async createManyExperiences(data: ExperienceCreateEty[]) {
    return await prisma.work_experience.createMany({
      data,
      skipDuplicates: true
    });
  }

  async updateExperience({ id, ...data }: ExperienceUpdateEty) {
    return await prisma.work_experience.update({
      where: {
        id,
      },
      data,
    });
  }

  async getExperiences(skip?: number, take?: number) {
    return await prisma.work_experience.findMany({
      skip,
      take,
    });
  }

  async getLastCreatedExperiences(count: number) {
    return await prisma.work_experience.findMany({
      take: count,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getExperience(id: number) {
    return await prisma.work_experience.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteExperience(id: number) {
    return await prisma.work_experience.delete({ where: { id } });
  }
}
