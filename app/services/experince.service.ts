import { Work_experience } from '.prisma/client';
import HttpException from '../exceptions/http.exception';
import { PaginationsProps } from '../types';
import ExperienceRepository from '../repositories/experience.repository';
import {
  ExperienceCreateDTO,
  ExperienceUpdateDTO,
} from '../mappers/types/experience.types';

class ExperienceSevice {
  async getExperiences({ skip, take }: PaginationsProps) {
    return new ExperienceRepository().getExperiences(skip, take);
  }

  async createExperience(experienceData: ExperienceCreateDTO) {
    const experienceRepository = new ExperienceRepository();

    return await experienceRepository
      .createExperience(experienceData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot create experience');
      });
  }

  async createManyExperiences(experiencesData: ExperienceCreateDTO[]) {
    const experienceRepository = new ExperienceRepository();

    return await experienceRepository
      .createManyExperiences(experiencesData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot create experience');
      });
  }

  async updateExperience(
    experienceData: ExperienceUpdateDTO,
  ): Promise<Work_experience> {
    const experienceRepository = new ExperienceRepository();

    return experienceRepository
      .updateExperience(experienceData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot update experience');
      });
  }

  async deleteExperience(id: number): Promise<Work_experience | null> {
    const experienceRepository = new ExperienceRepository();

    return experienceRepository.deleteExperience(id).catch((err) => {
      console.log(err.message);
      throw new HttpException(404, 'Experience is not found');
    });
  }
}

export default new ExperienceSevice();
