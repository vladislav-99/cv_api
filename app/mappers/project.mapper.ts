import { Technologies } from '@prisma/client';
import {
  ProjectEtyToDTO,
  ProjectListElEntity,
  ProjectUpdateVmToDto,
  ProjectVm,
  ProjectVmToDto,
  ProjectWithTechnologiesEntity,
} from './types/porject.types';

// VM -> DTO -> VM
export const mapVmToDto = {
  updatedProject: ({ id, name, ...project }: ProjectVm) => ({
    id: Number(id),
    name: name && name.trim(),
    ...project,
  }),
  createdProject: ({ name, type, ...project }: ProjectVm) => ({
    name: name!.trim(),
    type: type!,
    ...project,
  }),
};

export const mapDtoToVm = {
  project: (project: ProjectEtyToDTO) => project,
  listProjects: ({ technologies, ...project }: ProjectEtyToDTO) => ({
    technologies: technologies.map((t: Technologies) => t.name),
    ...project,
  }),
};

// DTO -> ETY -> DTO

export const mapEtyToDto = {
  project: ({
    project_technologies,
    ...ety
  }: ProjectWithTechnologiesEntity | ProjectListElEntity) => ({
    ...ety,
    technologies: project_technologies.map(
      (t: { technology: Technologies }) => t.technology,
    ),
  }),
};

export const mapDtoToEty = {
  updatedProject: (project: ProjectUpdateVmToDto) => ({
    ...project,
    id: Number(project.id!),
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createdProject: ({ id, ...project }: ProjectVmToDto) => ({
    ...project,
    name: project.name!,
    type: project.type!,
  }),
};
