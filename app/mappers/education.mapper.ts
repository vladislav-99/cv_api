import { EducationMv } from "./types/education.types";

export const mapVmToDto = {
  updated: (t: EducationMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
    };
  },
  created: ({ id, ...t }: EducationMv) => {
    return {
      name: t.name!.trim(),
    };
  },
};
