import {
  ProjectEntity,
  ProjectListElEntity,
  ProjectUpdateEntity,
  ProjectWithTechnologiesEntity,
} from '../mappers/types/porject.types';
import prisma from '../prisma';

export default class ProjectRepository {
  async createProject(
    {technologies, ...data}: ProjectEntity,
  ): Promise<ProjectWithTechnologiesEntity> {

    return await prisma.projects.create({
      data: {
        ...data,
        project_technologies: {
          createMany: {
            data: technologies
          }
        }
      },
      include: {
        project_technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async updateProject({
    id,
    ...data
  }: ProjectUpdateEntity): Promise<ProjectWithTechnologiesEntity> {
    return await prisma.projects.update({
      where: {
        id,
      },
      data,
      include: {
        project_technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async getProjects(
    skip?: number,
    take?: number,
  ): Promise<ProjectListElEntity[]> {
    return await prisma.projects.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        type: true,
        country: true,
        project_technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async getProject(id: number): Promise<ProjectWithTechnologiesEntity | null> {
    return await prisma.projects.findFirst({
      where: {
        id,
      },
      include: {
        project_technologies: {
          include: {
            technology: true,
          },
        },
      },
    });
  }

  async deleteProject(id: number) {
    return await prisma.projects.delete({ where: { id } });
  }
}
