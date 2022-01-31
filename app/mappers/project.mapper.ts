import { Technologies } from '@prisma/client';
import {
  ProjectEtyToDTO,
  ProjectListElEntity,
  ProjectUpdateVmToDto,
  ProjectVm,
  ProjectVmToDto,
  ProjectWithTechnologiesAndImagesEntity,
} from './types/project.types';

// VM -> DTO -> VM
export const mapVmToDto = {
  updatedProject: ({ id, name, photos, ...project }: ProjectVm) => ({
    id: Number(id),
    name: name && name.trim(),
    ...project,
  }),
  createdProject: ({ name, type, photos, technologies = [], ...project }: ProjectVm) => ({
    name: name!.trim(),
    type: type!,
    technologies: technologies.map(technology_id => ({ technology_id: Number(technology_id) })),
    ...project,
  }),
};

export const mapDtoToVm = {
  project: ({ ...project }: ProjectEtyToDTO) => ({
    ...project
  }),
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
  }: ProjectWithTechnologiesAndImagesEntity) => ({
    ...ety,
    technologies: project_technologies.map(
      (t: { technology: Technologies }) => t.technology,
    ),
  }),
};

export const mapDtoToEty = {
  updatedProject: ({technologies, ...project}: ProjectUpdateVmToDto) => ({
    ...project,
    technologies: technologies ? technologies.map(id => ({
      technology_id: Number(id)
    })) : undefined,
    id: Number(project.id!),
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createdProject: ({ id, ...project }: ProjectVmToDto) => ({
    ...project,
    name: project.name!,
    type: project.type!,
  }),
};
