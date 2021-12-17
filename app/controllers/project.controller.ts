import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
import { mapDtoToVm, mapVmToDto } from '../mappers/project.mapper';
import { ProjectVm } from '../mappers/types/porject.types';
import projectService from '../services/project.service';

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { skip, take } = req.query;

    const options = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    };

    const projects = await projectService.getProjects(options);

    const projectsList = projects.map((p) => mapDtoToVm.listProjects(p));

    res.json(projectsList);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const projectDTO = await projectService.getProjectById(Number(id));

    if (!projectDTO) {
      next(new HttpException(404, 'Project is not found'));
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
  next: NextFunction,
) => {
  try {
    const projectModel: ProjectVm = req.body;
    const projectDTO = mapVmToDto.createdProject(projectModel);

    const createdProject = await projectService.createProject(projectDTO);

    const projectVM = mapDtoToVm.project(createdProject);

    res.status(200).json(projectVM);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const projectModel: ProjectVm = {
      id,
      ...req.body,
    };

    const projectDTO = mapVmToDto.updatedProject(projectModel);

    const updatedProject = await projectService.updateProject(projectDTO);

    const projectVM = mapDtoToVm.project(updatedProject);

    res.status(200).json(projectVM);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(new HttpException(500, 'Something went wrong'));
  }
};
