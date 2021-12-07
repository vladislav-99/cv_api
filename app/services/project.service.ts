import { Projects } from ".prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import { ProjectType } from "../mapper/project.mapper";
import prisma from "../prisma";

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

  async createProject(projectData: ProjectType): Promise<Projects> {
    const { name, type } = projectData;

    if (!name || (name && !name.trim()) || name === undefined) {
      throw new HttpException(400, "'name' field is reqired");
    }

    if (!type) {
      throw new HttpException(400, "'type' field is wrong");
    }

    return await prisma.projects
      .create({
        data: {
          ...projectData,
          name,
          type,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create project");
      });
  }

  async updateProject(projectData: Partial<ProjectType>): Promise<Projects> {
    const { id, ...updatingData } = projectData;
    const { name } = updatingData;

    if (name !== undefined && !name) {
      throw new HttpException(400, "name field cannot be empty");
    }

    return await prisma.projects
      .update({
        where: {
          id,
        },
        data: updatingData,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update project");
      });
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
