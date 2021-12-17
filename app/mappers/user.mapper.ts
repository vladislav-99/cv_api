import {
  UserCreatedDTO,
  UserInfoEntity,
  UserUpdatedDTO,
  UserVm,
} from "./types/user.types";

export const mapVmToDto = {
  updated: (u: UserVm) => {
    const id = Number(u.id);
    return {
      id,
      name: u.name && u.name.trim(),
      description: u.description && u.description.trim(),
      photo: u.photo,
      sphere: u.sphere && u.sphere.trim(),
    };
  },
  created: ({ id, ...u }: UserVm) => {
    return {
      name: u.name && u.name.trim(),
      description: u.description && u.description.trim(),
      photo: u.photo,
      sphere: u.sphere && u.sphere.trim(),
    };
  },
};

export const mapDtoToEty = {
  updated: (u: UserUpdatedDTO) => u,
  created: (u: UserCreatedDTO) => ({
    ...u,
    name: u.name!,
  }),
};

export const mapEtyToDto = {
  userInfo: ({
    user_technologies,
    user_educations,
    work_experiences,
    ...ety
  }: UserInfoEntity) => ({
    ...ety,
    technologies: user_technologies.map((t) => t.technology),
    educations: user_educations.map(({ education, ...e }) => ({
      ...e,
      university: education,
    })),
    experience: work_experiences.map(({ work_experience, ...e }) => ({
      ...e,
      company: work_experience,
    })),
  }),
};
