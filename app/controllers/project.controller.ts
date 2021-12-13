import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { toProject } from "./mappers/toDTO/project.mapper";

import projectService from "../services/project.service";
import {
  ProjectViewModelType,
  ProjectVM,
} from "./mappers/toVM/viewModels/project.model";
import { ProjectDTO } from "./mappers/toDTO/DTOtypes";
import { toProjectVM } from "./mappers/toVM/project.mapper";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take } = req.query;

    const options = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    };

    const projects: ProjectDTO[] = await projectService.getProjects(options);

    const projectMVs: ProjectVM[] = projects.map((p) => toProjectVM(p));

    res.json(projectMVs);
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
