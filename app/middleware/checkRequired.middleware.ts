import { ProjectTypes, TechnologyTypes } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';

export enum RequredFields {
  name,
  projectType,
  technologyType,
  experiences = 'experiences',
  educations = 'educations',
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

function isValidName<T extends string>(name: T | undefined): boolean {

  const isNotUndefinedButEmpty = name !== undefined && !name;

  const isEmpty = isNotUndefinedButEmpty || (name && !name.trim());

  if (!name || isEmpty) {
    return false;
  }
  return true;
}

const checkRequired = (fields: RequredFields[], typeField?: FieldAction) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
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

        case RequredFields.educations:
        case RequredFields.experiences: {
          const validatingData: string[] = req.body[reqiredField];
          validatingData.forEach(e => {
            const isValid = isValidName(e);
            if (!isValid) error = new HttpException(400, `'${reqiredField}' is not valid`);
          });
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
    } catch (error) {
      next(new HttpException(400, "Error of validating"));
    }
  };

export default checkRequired;
