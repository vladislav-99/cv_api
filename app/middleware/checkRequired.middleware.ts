import { ProjectTypes, TechnologyTypes } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';

export enum RequredFields {
  name,
  projectType,
  technologyType,
}

export enum FieldAction {
  update,
  create,
}

function checkType<T, E>(
  value: T,
  enumValue: E,
  typeField?: FieldAction,
): HttpException | null {
  if (typeField === FieldAction.create) {
    if (!value) {
      return new HttpException(400, "'type' field is reqired");
    }
  }

  if (typeField === FieldAction.create || typeField === FieldAction.update) {
    if (!Object.values(enumValue).includes(value) && value !== undefined) {
      return new HttpException(400, "'type' field is wrong");
    }
  }
  return null;
}

const checkRequired = (fields: RequredFields[], typeField?: FieldAction) => (req: Request, res: Response, next: NextFunction) => {
  let error: null | HttpException = null;
  fields.some((reqiredField) => {
    switch (reqiredField) {
    case RequredFields.name: {
      const { name } = req.body;

      const isNotUndefinedButEmpty = name !== undefined && !name;

      const isEmpty = isNotUndefinedButEmpty || (name && !name.trim());

      if (typeField === FieldAction.create) {
        if (!name || isEmpty) {
          error = new HttpException(400, "'name' field is reqired");
        }
      }

      if (typeField === FieldAction.update) {
        if (isEmpty) {
          error = new HttpException(400, "'name' field cannot be empty");
        }
      }
      break;
    }

    case RequredFields.projectType: {
      const { type }: { type: ProjectTypes } = req.body;
      error = checkType(type, ProjectTypes, typeField);
      break;
    }

    case RequredFields.technologyType: {
      const { type }: { type: TechnologyTypes } = req.body;
      error = checkType(type, TechnologyTypes, typeField);
      break;
    }
    default: {
      error = null;
    }
    }
    return !!error;
  });

  if (error) next(error);
  else next();
};

export default checkRequired;
