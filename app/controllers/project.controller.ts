import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import { toProject } from "../mapper/project.mapper";

import projectService from "../services/project.service";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getProjects().catch((err) => {
      next(err);
    });

    res.json(projects);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const project = await projectService
      .getProjectById(Number(id))
      .catch((err) => {
        next(err);
      });

    if (!project) {
      next(new HttpException(404, "Project is not found"));
    } else {
      res.json(project);
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectBody = toProject(req.body);

    const createdProject = await projectService
      .createProject(projectBody)
      .catch((err) => {
        next(err);
      });

    res.status(200).json(createdProject);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projectBody = toProject({
      id,
      ...req.body,
    });

    const updatedProject = await projectService
      .updateProject(projectBody)
      .catch((err) => {
        next(err);
      });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
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
