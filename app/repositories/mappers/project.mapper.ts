import { ProjectDTO } from "../../controllers/mappers/DTOtypes";

export const mapPojectToEntity = (project: ProjectDTO) => {
  return {
    ...project,
    name: project.name!,
    type: project.type!,
  };
};
export const mapUpdatedPojectToEntity = (project: ProjectDTO) => {
  return {
    ...project,
    id: project.id!,
  };
};
