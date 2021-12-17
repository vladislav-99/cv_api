import { NextFunction, Request, Response } from "express";
import { mapVmToDto } from "../mappers/experience.mapper";
import { ExperienceMv } from "../mappers/types/experience.types";
import experienceService from "../services/experince.service";

export const getExperiences = async (req: Request, res: Response) => {
  const { skip, take } = req.query;

  const options = {
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined,
  };

  const experiences = await experienceService.getExperiences(options);

  res.status(200).json(experiences);
};

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experienceMv: ExperienceMv = req.body;
    const experienceDto = mapVmToDto.created(experienceMv);

    const createdExperience = await experienceService.createExperience(
      experienceDto
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
    const experienceMv: ExperienceMv = {
      id,
      ...req.body,
    };
    const experienceDto = mapVmToDto.updated(experienceMv);

    const updatedExperience = await experienceService.updateExperience(
      experienceDto
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
