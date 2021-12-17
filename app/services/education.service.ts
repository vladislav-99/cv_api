import { Education } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import { PaginationsProps } from "../types";
import EducationRepository from "../repositories/education.repository";
import {
  EducationCreateDTO,
  EducationUpdateDTO,
} from "../mappers/types/education.types";

class EducationSevice {
  async getEducations({ skip, take }: PaginationsProps): Promise<Education[]> {
    return await new EducationRepository().getEducations(skip, take);
  }

  async createEducation(dto: EducationCreateDTO): Promise<Education> {
    const experienceRepository = new EducationRepository();

    return await experienceRepository.createEducation(dto).catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot create experience");
    });
  }

  async updateEducation(dto: EducationUpdateDTO): Promise<Education> {
    const experienceRepository = new EducationRepository();

    return experienceRepository.updateEducation(dto).catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot update experience");
    });
  }

  async deleteEducation(id: number): Promise<Education | null> {
    const experienceRepository = new EducationRepository();

    return experienceRepository.deleteEducation(id).catch((err) => {
      console.log(err.message);
      throw new HttpException(404, "Education is not found");
    });
  }
}

export default new EducationSevice();
