import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { mapVmToDto } from "../mappers/technology.mapper";
import { TechnologyMv } from "../mappers/types/technology.types";
import technologyService from "../services/technology.service";

export const getTechnologies = async (req: Request, res: Response) => {
  const technologies = await technologyService.getTechnologies();

  res.status(200).json(technologies);
};

export const createTechnology = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const technologyModel: TechnologyMv = req.body;
    const technologyDto = mapVmToDto.created(technologyModel);

    const technology = await technologyService
      .createTechnology(technologyDto)
      .catch((err) => {
        next(err);
      });

    res.status(200).json(technology);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};

export const updateTechnology = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const technologyModel: TechnologyMv = {
      id,
      ...req.body,
    };
    const technologyDto = mapVmToDto.updated(technologyModel);

    const updatedTechnology = await technologyService
      .updateTechnology(technologyDto)
      .catch((err) => {
        next(err);
      });

    res.status(200).json(updatedTechnology);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};

export const deleteTechnology = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedTechnology = await technologyService
      .deleteTechnology(Number(id))
      .catch((err) => {
        next(err);
      });

    if (deletedTechnology) {
      res.json({ success: true, deletedTechnology });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};
