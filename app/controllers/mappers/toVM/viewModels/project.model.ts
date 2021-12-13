import { ProjectTypes } from ".prisma/client";

export type ProjectViewModelType = {
  id?: number | string;
  name?: string;
  description?: string;
  link?: string;
  country?: string;
  photos?: string[];
  type?: ProjectTypes;
};

export type ProjectVM = {
  id: number;
  name: string;
  country: string | null;
  type: ProjectTypes;
  technologies: string[] | null;
};
