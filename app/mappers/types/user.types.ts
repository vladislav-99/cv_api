import {
  CV,
  Education,
  Technologies,
  User,
  Work_experience,
} from '.prisma/client';
import { mapDtoToEty, mapVmToDto } from '../user.mapper';

export interface UserVm {
  id?: string;
  name?: string;
  description?: string;
  photo?: string;
  sphere?: string;
}

export type UserCreatedDTO = ReturnType<typeof mapVmToDto.created>;
export type UserUpdatedDTO = ReturnType<typeof mapVmToDto.updated>;

export type UserCreatedEty = ReturnType<typeof mapDtoToEty.created>;
export type UserUpdatedEty = ReturnType<typeof mapDtoToEty.updated>;

export type UserInfoEntity =
  | User & {
    user_technologies: {
      technology: Technologies;
    }[];
  } & {
    user_educations: {
      id: number;
      start_date: Date | null;
      end_date: Date | null;
      department: string | null;
      education: Education;
    }[];
  } & {
    work_experiences: {
      id: number;
      start_date: Date | null;
      end_date: Date | null;
      description: string | null;
      position: string | null;
      work_experience: Work_experience;
    }[];
  } & {
    cvs: CV[];
  };
