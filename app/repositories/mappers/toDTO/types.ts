import {
  mapProjectListElToDTO,
  mapProjectFromEntityToDTO,
} from "./project.mapper";

export type ProjectDTO = ReturnType<typeof mapProjectFromEntityToDTO>;
export type ProjectListElDTO = ReturnType<typeof mapProjectListElToDTO>;
