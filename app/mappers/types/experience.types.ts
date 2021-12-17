import { mapVmToDto } from "../experience.mapper";

export interface ExperienceMv {
  id?: number;
  name?: string;
}

export type ExperienceCreateDTO = ReturnType<typeof mapVmToDto.created>;
export type ExperienceUpdateDTO = ReturnType<typeof mapVmToDto.updated>;

export type ExperienceCreateEty = ExperienceCreateDTO;
export type ExperienceUpdateEty = ExperienceUpdateDTO;
