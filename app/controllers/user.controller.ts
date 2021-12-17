import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
import { mapVmToDto } from '../mappers/user.mapper';
import userService from '../services/user.service';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    if (!user) {
      next(new HttpException(404, 'User is not found'));
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
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

    const users = await userService.getAllUsers(options);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userBody = mapVmToDto.created(req.body);

    const createdUser = await userService.createUser(userBody);

    res.status(200).json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userBody = mapVmToDto.updated({
      id,
      ...req.body,
    });

    const updatedUser = await userService.updateUser(userBody);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(Number(id));

    if (deletedUser) {
      res.json({ success: true, deletedUser });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};
