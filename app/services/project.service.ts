import { Projects } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import {
  ProjectDTO,
  ProjectListElDTO,
} from "../repositories/mappers/toDTO/types";
import prisma from "../prisma";
import {
  mapPojectToEntity,
  mapUpdatedPojectToEntity,
} from "../repositories/mappers/toEntity/project.mapper";
import ProjectRepository from "../repositories/project.repository";
import {
  ProjectEntity,
  ProjectListElEntity,
  ProjectUpdateEntity,
  ProjectWithTechnologiesEntity,
} from "../repositories/mappers/toEntity/types";
import {
  mapProjectFromEntityToDTO,
  mapProjectListElToDTO,
} from "../repositories/mappers/toDTO/project.mapper";
import {
  ProjectDTO as FromVMProjectDTO,
  ProjectUpdateDTO,
} from "../controllers/mappers/toDTO/types";

type GetProjectsProps = {
  skip?: number;
  take?: number;
};
class ProjectSevice {
  async getProjectById(id: number): Promise<ProjectDTO> {
    const projectRepository = new ProjectRepository();

    const projectEntity: ProjectWithTechnologiesEntity | null =
      await projectRepository.getProject(id).catch((err) => {
        console.log(err);
        throw new HttpException(404, "Project is not found");
      });

    if (!projectEntity) throw new HttpException(404, "Project is not found");

    const createdProjectDTO: ProjectDTO =
      mapProjectFromEntityToDTO(projectEntity);

    return createdProjectDTO;
  }

  async getProjects({
    skip,
    take,
  }: GetProjectsProps): Promise<ProjectListElDTO[]> {
    const projectRepository = new ProjectRepository();

    const projectEntities: ProjectListElEntity[] = await projectRepository
      .getProjects(skip, take)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot get projects");
      });

    const createdProjectDTOs: ProjectListElDTO[] = projectEntities.map((ety) =>
      mapProjectListElToDTO(ety)
    );

    return createdProjectDTOs;
  }

  async createProject(projectDTO: FromVMProjectDTO): Promise<ProjectDTO> {
    const projectEntity: ProjectEntity = mapPojectToEntity(projectDTO);

    const projectRepository = new ProjectRepository();

    const createdProjectEntity: ProjectWithTechnologiesEntity =
      await projectRepository.createProject(projectEntity).catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create project");
      });

    const createdProjectDTO: ProjectDTO =
      mapProjectFromEntityToDTO(createdProjectEntity);

    return createdProjectDTO;
  }

  async updateProject(projectDTO: ProjectUpdateDTO): Promise<ProjectDTO> {
    const projectUpdateEntity: ProjectUpdateEntity =
      mapUpdatedPojectToEntity(projectDTO);

    const projectRepository = new ProjectRepository();

    const updatedProjectEntity: ProjectWithTechnologiesEntity =
      await projectRepository
        .updateProject(projectUpdateEntity)
        .catch((err) => {
          console.log(err);
          throw new HttpException(400, "Cannot update project");
        });

    const createdProjectDTO: ProjectDTO =
      mapProjectFromEntityToDTO(updatedProjectEntity);

    return createdProjectDTO;
  }

  async deleteProject(id: number): Promise<Projects | null> {
    return await prisma.projects
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "Project is not found");
      });
  }
}

export default new ProjectSevice();
