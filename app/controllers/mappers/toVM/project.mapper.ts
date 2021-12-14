import { ProjectListElDTO } from "../../../repositories/mappers/toDTO/types";
import { ProjectDTO } from "../.././../repositories/mappers/toDTO/types";

export const toProjectVM = (project: ProjectDTO) => {
  return {
    ...project,
  };
};

export const toProjectListElVM = ({
  technologies,
  ...project
}: ProjectListElDTO) => {
  return {
    technologies: technologies.map((t) => t.name),
    ...project,
  };
};
