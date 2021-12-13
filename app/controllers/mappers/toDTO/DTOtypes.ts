import { ProjectMapper } from "./project.mapper";
import { TechnologyMapper } from "./tecnology.mapper";
import { UserMapper } from "./user.mapper";

type WithNameType = {
  id?: number;
  name: string;
};

export type ExperienceDTO = WithNameType;
export type EducationDTO = WithNameType;

export type TechnologyDTO = Pick<TechnologyMapper, "id" | "name" | "type">;

export type ProjectDTO = Pick<
  ProjectMapper,
  "id" | "name" | "description" | "link" | "country" | "type" | "photos"
>;

export type UserDTO = Pick<
  UserMapper,
  "id" | "name" | "description" | "photo" | "sphere"
>;
