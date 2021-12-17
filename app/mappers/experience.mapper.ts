import { ExperienceMv } from "./types/experience.types";

export const mapVmToDto = {
  updated: (t: ExperienceMv) => {
    const id = Number(t.id);
    return {
      id,
      name: t.name && t.name.trim(),
    };
  },
  created: ({ id, ...t }: ExperienceMv) => {
    return {
      name: t.name!.trim(),
    };
  },
};
