import { NextFunction, Request, Response } from "express";
import { mapVmToDto } from "../mappers/education.mapper";
import { EducationMv } from "../mappers/types/education.types";
import educationService from "../services/education.service";

export const getEducations = async (req: Request, res: Response) => {
  const { skip, take } = req.query;

  const options = {
    skip: skip ? Number(skip) : undefined,
    take: take ? Number(take) : undefined,
  };

  const educations = await educationService.getEducations(options);

  res.status(200).json(educations);
};

export const createEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const educationMv: EducationMv = req.body;
    const educationDto = mapVmToDto.created(educationMv);

    const createdEducation = await educationService.createEducation(
      educationDto
    );

    res.status(200).json(createdEducation);
  } catch (error) {
    next(error);
  }
};
export const updateEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const educationMv: EducationMv = {
      id,
      ...req.body,
    };

    const educationDto = mapVmToDto.updated(educationMv);

    const updatedEducation = await educationService.updateEducation(
      educationDto
    );

    res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
};
export const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedEducation = await educationService.deleteEducation(Number(id));

    if (deletedEducation) {
      res.json({ success: true, deletedEducation });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};
