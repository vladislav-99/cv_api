import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { toProject } from "./mappers/project.mapper";

import projectService from "../services/project.service";
import { ProjectViewModelType } from "./viewModels/project.model";
import { ProjectDTO } from "./mappers/DTOtypes";
import { Projects } from "@prisma/client";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getProjects();

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const project = await projectService.getProjectById(Number(id));

    if (!project) {
      next(new HttpException(404, "Project is not found"));
    } else {
      res.json(project);
    }
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectModel: ProjectViewModelType = req.body;
    const projectDTO: ProjectDTO = toProject(projectModel);

    const createdProject: ProjectDTO = await projectService.createProject(
      projectDTO
    );

    res.status(200).json(createdProject);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projectModel: ProjectViewModelType = {
      id,
      ...req.body,
    };

    const projectDTO: ProjectDTO = toProject(projectModel);

    const updatedProject: ProjectDTO = await projectService.updateProject(
      projectDTO
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedProject = await projectService
      .deleteProject(Number(id))
      .catch((err) => {
        next(err);
      });

    if (deletedProject) {
      res.json({ success: true, deletedProject });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};
