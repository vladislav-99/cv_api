import {
  ProjectEntity,
  ProjectUpdateEntity,
  ProjectWithTechnologiesAndImagesEntity,
} from '../mappers/types/project.types';
import prisma from '../prisma';

export default class ProjectRepository {
  async createProject(
    {technologies, ...data}: ProjectEntity,
  ): Promise<ProjectWithTechnologiesAndImagesEntity> {

    return await prisma.projects.create({
      data: {
        ...data,
        project_technologies: {
          createMany: {
            data: technologies,
          }
        }
      },
      include: {
        photos: true,
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
    technologies,
    ...data
  }: ProjectUpdateEntity): Promise<ProjectWithTechnologiesAndImagesEntity> {
    return await prisma.projects.update({
      where: {
        id,
      },
      data: {
        ...data,
        project_technologies: technologies ? {
          deleteMany: {},
          createMany: {
            data: technologies
          }
        } : undefined
      },
      include: {
        project_technologies: {
          include: {
            technology: true,
          },
        },
        photos: true
      },
    });
  }

  async getProjects(
    skip?: number,
    take?: number,
  ): Promise<ProjectWithTechnologiesAndImagesEntity[]> {
    return await prisma.projects.findMany({
      skip,
      take,
      include: {
        project_technologies: {
          include: {
            technology: true,
          },
        },
        photos: true
      },
    });
  }

  async getProject(id: number): Promise<ProjectWithTechnologiesAndImagesEntity | null> {
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
        photos: true
      },
    });
  }

  async deleteProject(id: number) {
    return await prisma.projects.delete({ where: { id }, include: {
      photos: true
    } });
  }
}
