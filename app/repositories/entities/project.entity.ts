import {
  mapPojectToEntity,
  mapUpdatedPojectToEntity,
} from "../mappers/project.mapper";

export type ProjectEntity = ReturnType<typeof mapPojectToEntity>;
export type UpdateProjectEntity = ReturnType<typeof mapUpdatedPojectToEntity>;
