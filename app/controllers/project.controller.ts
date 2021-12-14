import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import {
  ProjectDTO,
  ProjectListElDTO,
} from "../repositories/mappers/toDTO/types";
import {
  ProjectDTO as FromVMProjectDTO,
  ProjectUpdateDTO,
} from "./mappers/toDTO/types";

import projectService from "../services/project.service";
import {
  toProjectDTO,
  toProjectUpdateDTO,
} from "./mappers/toDTO/project.mapper";
import {
  ProjectListElVM,
  ProjectVM,
  ProjectVMFromDTO,
} from "./mappers/toVM/types";
import { toProjectListElVM, toProjectVM } from "./mappers/toVM/project.mapper";

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

    const projects: ProjectListElDTO[] = await projectService.getProjects(
      options
    );

    const projectsList: ProjectListElVM[] = projects.map((p) =>
      toProjectListElVM(p)
    );

    res.json(projectsList);
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

    const projectDTO: ProjectDTO | null = await projectService.getProjectById(
      Number(id)
    );

    if (!projectDTO) {
      next(new HttpException(404, "Project is not found"));
    } else {
      res.json(projectDTO);
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
    const projectModel: ProjectVM = req.body;
    const projectDTO: FromVMProjectDTO = toProjectDTO(projectModel);

    const createdProject: ProjectDTO = await projectService.createProject(
      projectDTO
    );

    const projectVM: ProjectVMFromDTO = toProjectVM(createdProject);

    res.status(200).json(projectVM);
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
    const projectModel: ProjectVM = {
      id,
      ...req.body,
    };

    const projectDTO: ProjectUpdateDTO = toProjectUpdateDTO(projectModel);

    const updatedProject: ProjectDTO = await projectService.updateProject(
      projectDTO
    );

    const projectVM: ProjectVMFromDTO = toProjectVM(updatedProject);

    res.status(200).json(projectVM);
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
