import { Technologies } from "@prisma/client";
import {
  ProjectEtyToDTO,
  ProjectListElEntity,
  ProjectUpdateVmToDto,
  ProjectVm,
  ProjectVmToDto,
  ProjectWithTechnologiesEntity,
} from "./types/porject.types";

// VM -> DTO -> VM
export const mapVmToDto = {
  updatedProject: ({ id, name, ...project }: ProjectVm) => {
    return {
      id: Number(id),
      name: name && name.trim(),
      ...project,
    };
  },
  createdProject: ({ name, type, ...project }: ProjectVm) => {
    return {
      name: name!.trim(),
      type: type!,
      ...project,
    };
  },
};

export const mapDtoToVm = {
  project: (project: ProjectEtyToDTO) => project,
  listProjects: ({ technologies, ...project }: ProjectEtyToDTO) => {
    return {
      technologies: technologies.map((t: Technologies) => t.name),
      ...project,
    };
  },
};

// DTO -> ETY -> DTO

export const mapEtyToDto = {
  project: ({
    project_technologies,
    ...ety
  }: ProjectWithTechnologiesEntity | ProjectListElEntity) => {
    return {
      ...ety,
      technologies: project_technologies.map(
        (t: { technology: Technologies }) => t.technology
      ),
    };
  },
};

export const mapDtoToEty = {
  updatedProject: (project: ProjectUpdateVmToDto) => {
    return {
      ...project,
      id: Number(project.id!),
    };
  },
  createdProject: ({ id, ...project }: ProjectVmToDto) => {
    return {
      ...project,
      name: project.name!,
      type: project.type!,
    };
  },
};
