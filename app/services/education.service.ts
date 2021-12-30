import { Education } from '.prisma/client';
import HttpException from '../exceptions/http.exception';
import { PaginationsProps } from '../types';
import EducationRepository from '../repositories/education.repository';
import {
  EducationCreateDTO,
  EducationUpdateDTO,
} from '../mappers/types/education.types';

class EducationSevice {
  async getEducations({ skip, take }: PaginationsProps): Promise<Education[]> {
    return await new EducationRepository().getEducations(skip, take);
  }

  async createEducation(dto: EducationCreateDTO): Promise<Education> {
    const educationRepository = new EducationRepository();

    return await educationRepository.createEducation(dto).catch((err) => {
      console.log(err);
      throw new HttpException(400, 'Cannot create education');
    });
  }

  async createManyEducation(educationsData: EducationCreateDTO[]) {
    const educationRepository = new EducationRepository();

    const newEducationdCount = await educationRepository
      .createManyEducations(educationsData)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot create education');
      });

    if (newEducationdCount.count) {
      return await educationRepository.getLastCreatedEducations(newEducationdCount.count);
    } else {
      throw new HttpException(400, 'Cannot create educations');
    }
  }

  async updateEducation(dto: EducationUpdateDTO): Promise<Education> {
    const educationRepository = new EducationRepository();

    return educationRepository.updateEducation(dto).catch((err) => {
      console.log(err);
      throw new HttpException(400, 'Cannot update education');
    });
  }

  async deleteEducation(id: number): Promise<Education | null> {
    const educationRepository = new EducationRepository();

    return educationRepository.deleteEducation(id).catch((err) => {
      console.log(err.message);
      throw new HttpException(404, 'Education is not found');
    });
  }
}

export default new EducationSevice();
