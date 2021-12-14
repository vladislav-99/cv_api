import {
  ProjectWithTechnologiesEntity,
  ProjectListElEntity,
} from "../toEntity/types";

export const mapProjectFromEntityToDTO = ({
  project_technologies,
  ...ety
}: ProjectWithTechnologiesEntity) => {
  return {
    ...ety,
    technologies: project_technologies.map((t) => t.technology),
    name: ety.name!,
    type: ety.type!,
  };
};

export const mapProjectListElToDTO = ({
  id,
  project_technologies,
  ...ety
}: ProjectListElEntity) => {
  return {
    id,
    technologies: project_technologies.map((t) => t.technology),
    ...ety,
  };
};
