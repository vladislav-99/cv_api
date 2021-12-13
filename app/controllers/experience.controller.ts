import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { ExperienceDTO } from "./mappers/DTOtypes";
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
    // const experience: experineceType = toExperience(req.body);
    // const createdExperience = await experienceService.createExperience(
    //   experienceBody
    // );
    // res.status(200).json(createdExperience);
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
    const projectModel: ExperienceDTO = {
      id,
      ...req.body,
    };

    const updatedExperience = await experienceService.updateExperience(
      projectModel
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
