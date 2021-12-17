import { Projects } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import { mapDtoToEty, mapEtyToDto } from "../mappers/project.mapper";
import {
  ProjectEtyToDTO,
  ProjectUpdateVmToDto,
  ProjectVmToDto,
  ProjectWithTechnologiesEntity,
} from "../mappers/types/porject.types";

import ProjectRepository from "../repositories/project.repository";
import { PaginationsProps } from "../types";
class ProjectSevice {
  async getProjectById(id: number): Promise<ProjectEtyToDTO> {
    const projectRepository = new ProjectRepository();

    const projectEntity: ProjectWithTechnologiesEntity | null =
      await projectRepository.getProject(id).catch((err) => {
        console.log(err);
        throw new HttpException(404, "Project is not found");
      });

    if (!projectEntity) throw new HttpException(404, "Project is not found");

    return mapEtyToDto.project(projectEntity);
  }

  async getProjects({
    skip,
    take,
  }: PaginationsProps): Promise<ProjectEtyToDTO[]> {
    const projectRepository = new ProjectRepository();

    const projectEntities = await projectRepository
      .getProjects(skip, take)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot get projects");
      });

    return projectEntities.map((ety) => mapEtyToDto.project(ety));
  }

  async createProject(projectDTO: ProjectVmToDto): Promise<ProjectEtyToDTO> {
    const projectEntity = mapDtoToEty.createdProject(projectDTO);

    const projectRepository = new ProjectRepository();

    const createdProjectEntity = await projectRepository
      .createProject(projectEntity)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create project");
      });

    return mapEtyToDto.project(createdProjectEntity);
  }

  async updateProject(
    projectDTO: ProjectUpdateVmToDto
  ): Promise<ProjectEtyToDTO> {
    const projectEntity = mapDtoToEty.updatedProject(projectDTO);

    const projectRepository = new ProjectRepository();

    const updatedProjectEntity = await projectRepository
      .updateProject(projectEntity)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update project");
      });

    return mapEtyToDto.project(updatedProjectEntity);
  }

  async deleteProject(id: number): Promise<Projects | null> {
    const projectRepository = new ProjectRepository();

    return await projectRepository.deleteProject(id).catch((err) => {
      console.log(err);
      throw new HttpException(404, "Project is not found");
    });
  }
}

export default new ProjectSevice();
