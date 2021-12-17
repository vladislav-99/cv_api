import { TechnologyMv } from './types/technology.types';

export const mapVmToDto = {
  updated: (t: TechnologyMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
      type: t.type,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created: ({ id, ...t }: TechnologyMv) => ({
    name: t.name!.trim(),
    type: t.type!,
  }),
};
