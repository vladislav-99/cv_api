import { mapVmToDto } from '../experience.mapper';

export interface EducationMv {
  id?: number;
  name?: string;
}

export type EducationCreateDTO = ReturnType<typeof mapVmToDto.created>;
export type EducationUpdateDTO = ReturnType<typeof mapVmToDto.updated>;

export type EducationCreateEty = EducationCreateDTO;
export type EducationUpdateEty = EducationUpdateDTO;
