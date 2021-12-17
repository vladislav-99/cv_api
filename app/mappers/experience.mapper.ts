import { ExperienceMv } from './types/experience.types';

export const mapVmToDto = {
  updated: (t: ExperienceMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created: ({ id, ...t }: ExperienceMv) => ({
    name: t.name!.trim(),
  }),
};
