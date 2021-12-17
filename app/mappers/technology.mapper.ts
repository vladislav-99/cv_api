import { TechnologyMv } from "./types/technology.types";

export const mapVmToDto = {
  updated: (t: TechnologyMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
      type: t.type,
    };
  },
  created: ({ id, ...t }: TechnologyMv) => {
    return {
      name: t.name!.trim(),
      type: t.type!,
    };
  },
};
