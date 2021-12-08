import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import { toExperience } from "../mapper/experience.mapper";
import experienceService from "../services/experince.service";

export const getAllExperiences = async (req: Request, res: Response) => {
  const experiences = await experienceService.getAllExperiences();

  res.status(200).json(experiences);
};
export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experienceBody = toExperience(req.body);

    const createdExperience = await experienceService.createExperience(
      experienceBody
    );

    res.status(200).json(createdExperience);
  } catch (error) {
    next(error);
  }
};
export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projectBody = toExperience({
      id,
      ...req.body,
    });

    const updatedExperience = await experienceService.updateExperience(
      projectBody
    );

    res.status(200).json(updatedExperience);
  } catch (error) {
    next(error);
  }
};
export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedExperience = await experienceService.deleteExperience(
      Number(id)
    );

    if (deletedExperience) {
      res.json({ success: true, deletedExperience });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};
