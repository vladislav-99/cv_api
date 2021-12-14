import {
  ProjectDTO,
  ProjectUpdateDTO,
} from "../../../controllers/mappers/toDTO/types";

export const mapPojectToEntity = (project: ProjectDTO) => {
  return {
    ...project,
    name: project.name!,
    type: project.type!,
  };
};

export const mapUpdatedPojectToEntity = (project: ProjectUpdateDTO) => {
  return {
    ...project,
    id: project.id!,
  };
};
