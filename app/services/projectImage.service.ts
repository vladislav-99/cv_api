import HttpException from '../exceptions/http.exception';
import {
  ProjectImageCreateDTO,
  ProjectImageUpdateDTO
} from '../mappers/types/projectImage.types';

import ProjectImageRepository from '../repositories/projectImage.repository';

class ProjectImageService {
  async getProjectImagesByProjectId(projectId: number) {
    const projectImageRepository = new ProjectImageRepository();

    const projectImageEntity = await projectImageRepository
      .getProjectImagesByProjectId(projectId)
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, 'Image is not found');
      });

    if (!projectImageEntity) throw new HttpException(404, 'Image is not found');

    return projectImageEntity;
  }

  async getProjectImagesById(ids: number[]) {
    const projectImageRepository = new ProjectImageRepository();

    const projectImageEntities = await projectImageRepository.getProjectImages(ids).catch((err) => {
      console.log(err);
      throw new HttpException(404, 'Image is not found');
    });

    if (!projectImageEntities.length) throw new HttpException(404, 'Images is not found');

    return projectImageEntities;
  }

  async createProjectImage(projectImageDTO: ProjectImageCreateDTO) {
    const projectImageRepository = new ProjectImageRepository();

    const createdProjectImageEntity = await projectImageRepository
      .createProjectImage(projectImageDTO)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot create projectImage');
      });

    return createdProjectImageEntity;
  }

  async updateProjectImage(projectImageDTO: ProjectImageUpdateDTO) {
    const projectImageRepository = new ProjectImageRepository();

    const updatedProjectImageEntity = await projectImageRepository
      .updateProjectImage(projectImageDTO)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot update projectImage');
      });

    return updatedProjectImageEntity;
  }

  async setProjectIdToPhotos(projectId: number, imageIds:number[]) {
    const projectImageRepository = new ProjectImageRepository();
    return await projectImageRepository
      .setProjectIdToProjectImages(projectId, imageIds)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, 'Cannot update projectImages');
      });
  }

  async deleteProjectImage(id: number) {
    const projectImageRepository = new ProjectImageRepository();

    return await projectImageRepository.deleteImage(id).catch((err) => {
      console.log(err);
      throw new HttpException(404, 'Image is not found');
    });
  }
  async deleteProjectImages(ids: number[]) {
    const projectImageRepository = new ProjectImageRepository();

    return await projectImageRepository.deleteImages(ids).catch((err) => {
      console.log(err);
      throw new HttpException(404, 'Image is not found');
    });
  }
  async deleteProjectImagesByProjectId(projectId: number) {
    const projectImageRepository = new ProjectImageRepository();

    return await projectImageRepository.deleteImagesByProjectId(projectId).catch((err) => {
      console.log(err);
      throw new HttpException(404, 'Images is not found');
    });
  }
}

export default new ProjectImageService();
