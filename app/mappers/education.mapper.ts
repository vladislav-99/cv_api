import { EducationMv } from './types/education.types';

export const mapVmToDto = {
  updated: (t: EducationMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created: ({ id, ...t }: EducationMv) => ({
    name: t.name!.trim(),
  }),
};
