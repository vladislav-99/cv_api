import { TechnologyTypes } from '@prisma/client';
import { mapVmToDto } from '../technology.mapper';

export interface TechnologyMv {
  id?: number;
  name?: string;
  type?: TechnologyTypes;
}

export type TechnologyCreateDTO = ReturnType<typeof mapVmToDto.created>;
export type TechnologyUpdateDTO = ReturnType<typeof mapVmToDto.updated>;

export type TechnologyCreateEty = TechnologyCreateDTO;
export type TechnologyUpdateEty = TechnologyUpdateDTO;
