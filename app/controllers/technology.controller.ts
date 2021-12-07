import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import { toTechnology } from "../mapper/tecnology.mapper";
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
    const technologyBody = toTechnology(req.body);

    if (req.body.type && !technologyBody.type) {
      return next(new HttpException(400, "type's value is wrong"));
    }

    const technology = await technologyService
      .createTechnology(technologyBody)
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
    const userBody = toTechnology({
      id,
      ...req.body,
    });

    if (!userBody.name && !userBody.type) {
      return next(new HttpException(400, "Fields values are wrong"));
    }

    const updatedTechnology = await technologyService
      .updateTechnology(userBody)
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
