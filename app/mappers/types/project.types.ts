import { ProjectTypes, Projects, Technologies, Project_images } from '.prisma/client';
import {
  mapDtoToEty,
  mapDtoToVm,
  mapEtyToDto,
  mapVmToDto,
} from '../project.mapper';

// VM
export interface ProjectVm {
  id?: number | string;
  description?: string;
  link?: string;
  photos?: number[];
  country?: string;
  name?: string;
  type?: ProjectTypes;
  technologies?: number[] | string[]
}
export type ProjectElVm = ReturnType<typeof mapDtoToVm.listProjects>;

// DTO
export type ProjectVmToDto = ReturnType<typeof mapVmToDto.createdProject>;
export type ProjectUpdateVmToDto = ReturnType<typeof mapVmToDto.updatedProject>;
export type ProjectEtyToDTO = ReturnType<typeof mapEtyToDto.project>;

// ETY
export type ProjectEntity = ReturnType<typeof mapDtoToEty.createdProject>;
export type ProjectUpdateEntity = ReturnType<typeof mapDtoToEty.updatedProject>;

export type ProjectWithTechnologiesAndImagesEntity =
  | Projects & {
      project_technologies: { technology: Technologies }[];
      photos: Array<Project_images>
    };

export type ProjectListElEntity =
  | Pick<Projects, 'id' | 'name' | 'type' | 'country'> & {
      project_technologies: { technology: Technologies }[];
    };
