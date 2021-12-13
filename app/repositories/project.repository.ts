import prisma from "../prisma";
import { ProjectEntity, UpdateProjectEntity } from "./entities/project.entity";

export default class ProjectRepository {
  async createProject(data: ProjectEntity) {
    return await prisma.projects.create({
      data,
    });
  }

  async updateProject({ id, ...data }: UpdateProjectEntity) {
    return await prisma.projects.update({
      where: {
        id,
      },
      data,
    });
  }
}
