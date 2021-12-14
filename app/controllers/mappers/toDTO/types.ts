import { ProjectTypes, Technologies } from "@prisma/client";
import { toProjectDTO, toProjectUpdateDTO } from "./project.mapper";

import { TechnologyMapper } from "./tecnology.mapper";
import { UserMapper } from "./user.mapper";

type WithNameType = {
  id?: number;
  name: string;
};

export type ExperienceDTO = WithNameType;
export type EducationDTO = WithNameType;

export type TechnologyDTO = Pick<TechnologyMapper, "id" | "name" | "type">;

export type UserDTO = Pick<
  UserMapper,
  "id" | "name" | "description" | "photo" | "sphere"
>;

export type MappedProject = {
  [x: string]:
    | string
    | string[]
    | number
    | ProjectTypes
    | null
    | { technology: Technologies }[];
};

// export interface ProjectUpdateDTO {
//   id?: number;
//   description?: string;
//   link?: string;
//   photos?: string[];
//   country?: string;
//   name?: string;
//   type?: ProjectTypes;
// }

export type ProjectDTO = ReturnType<typeof toProjectDTO>;
export type ProjectUpdateDTO = ReturnType<typeof toProjectUpdateDTO>;
