import { Projects } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import { ProjectDTO } from "../controllers/mappers/DTOtypes";
import prisma from "../prisma";
import {
  mapPojectToEntity,
  mapUpdatedPojectToEntity,
} from "../repositories/mappers/project.mapper";
import ProjectRepository from "../repositories/project.repository";
import {
  ProjectEntity,
  UpdateProjectEntity,
} from "../repositories/entities/project.entity";
import { toProject } from "../controllers/mappers/project.mapper";

class ProjectSevice {
  async getProjectById(id: number): Promise<Projects | null> {
    return await prisma.projects
      .findFirst({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "Project is not found");
      });
  }

  async getProjects(): Promise<Projects[]> {
    return await prisma.projects.findMany();
  }

  async createProject(projectDTO: ProjectDTO): Promise<ProjectDTO> {
    const projectEntity: ProjectEntity = mapPojectToEntity(projectDTO);

    const projectRepository = new ProjectRepository();

    const createdProjectEntity: Projects = await projectRepository
      .createProject(projectEntity)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create project");
      });

    const createdProjectDTO: ProjectDTO = toProject(createdProjectEntity);

    return createdProjectDTO;
  }

  async updateProject(projectDTO: Partial<ProjectDTO>): Promise<ProjectDTO> {
    const projectUpdateEntity: UpdateProjectEntity =
      mapUpdatedPojectToEntity(projectDTO);

    const projectRepository = new ProjectRepository();

    const updatedProjectEntity: Projects = await projectRepository
      .updateProject(projectUpdateEntity)
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update project");
      });

    const createdProjectDTO: ProjectDTO = toProject(updatedProjectEntity);

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
