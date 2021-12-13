import { Projects } from "@prisma/client";
import prisma from "../prisma";
import { ProjectEntity, UpdateProjectEntity } from "./entities/project.entity";

export default class ProjectRepository {
  async createProject(data: ProjectEntity): Promise<Projects> {
    return await prisma.projects.create({
      data,
    });
  }

  async updateProject({ id, ...data }: UpdateProjectEntity): Promise<Projects> {
    return await prisma.projects.update({
      where: {
        id,
      },
      data,
    });
  }

  async getProjects(skip?: number, take?: number): Promise<Projects[]> {
    return await prisma.projects.findMany({
      skip,
      take,
      include: {
        project_technologies: true,
      },
    });
  }
}
