import { Work_experience } from ".prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import { ExperienceType } from "../mapper/experience.mapper";
import prisma from "../prisma";

class ExperienceSevice {
  async getAllExperiences(): Promise<Work_experience[]> {
    return await prisma.work_experience.findMany();
  }

  async createExperience(
    experienceDara: ExperienceType
  ): Promise<Work_experience> {
    const { name } = experienceDara;

    if (!name || (name && !name.trim()) || name === undefined) {
      throw new HttpException(400, "'name' field is reqired");
    }

    return await prisma.work_experience
      .create({
        data: {
          name,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create experience");
      });
  }

  async updateExperience(
    experienceDara: Partial<ExperienceType>
  ): Promise<Work_experience> {
    const { id, ...updatingData } = experienceDara;
    const { name } = updatingData;

    if (name !== undefined && !name) {
      throw new HttpException(400, "name field cannot be empty");
    }

    return await prisma.work_experience
      .update({
        where: {
          id,
        },
        data: updatingData,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update experience");
      });
  }

  async deleteExperience(id: number): Promise<Work_experience | null> {
    if (isNaN(id)) throw new HttpException(400, "Incorrect Id field");

    return await prisma.work_experience
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new HttpException(404, "Experience is not found");
      });
  }
}

export default new ExperienceSevice();
