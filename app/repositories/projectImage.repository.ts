import {
  ProjectImageCreateEty,
  ProjectImageUpdateEty,
} from '../mappers/types/projectImage.types';
import prisma from '../prisma';

export default class ProjectImageRepository {
  async createProjectImage(data: ProjectImageCreateEty) {
    return await prisma.project_images.create({
      data,
    });
  }

  async createProjectImages(data: ProjectImageCreateEty[]) {
    return await prisma.project_images.createMany({
      data,
    });
  }

  async updateProjectImage({ id, ...data }: ProjectImageUpdateEty) {
    return await prisma.project_images.update({
      where: {
        id,
      },
      data,
    });
  }
  async setProjectIdToProjectImages(projectId: number, imageIds: number[]) {
    return await prisma.project_images.updateMany({
      where: {
        id: {
          in: imageIds
        },
      },
      data: {
        project_id: projectId
      },
    });
  }

  async getProjectImage(id: number) {
    return await prisma.project_images.findFirst({
      where: {
        id,
      },
    });
  }

  async getProjectImagesByProjectId(id: number) {
    return await prisma.project_images.findMany({
      where: {
        project_id: id,
      },
    });
  }

  async getProjectImages(ids: number[]) {
    return await prisma.project_images.findMany({
      where: {
        id: {
          in: ids
        },
      },
    });
  }

  async deleteImage(id: number) {
    return await prisma.project_images.delete({ where: { id } });
  }

  async deleteImages(ids: number[]) {
    return await prisma.project_images.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
  async deleteImagesByProjectId(id: number) {
    return await prisma.project_images.deleteMany({
      where: {
        project_id: id
      }
    });
  }
}
