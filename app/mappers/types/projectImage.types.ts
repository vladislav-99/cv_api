import { mapVmToDto } from '../projectImage.mapper';

export interface ProjectImageMv {
  id?: number;
  name: string;
  url: string;
  size: number;
  project_id?: number
}

export type ProjectImageCreateDTO = ReturnType<typeof mapVmToDto.created>;
export type ProjectImageUpdateDTO = ReturnType<typeof mapVmToDto.updated>;


export type ProjectImageCreateEty = Omit<ProjectImageMv, 'id'>

export interface ProjectImageUpdateEty extends ProjectImageCreateEty {
  id: number
}
