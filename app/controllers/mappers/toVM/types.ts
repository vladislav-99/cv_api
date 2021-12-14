import { ProjectTypes } from ".prisma/client";
import { toProjectListElVM, toProjectVM } from "./project.mapper";

export interface ProjectVM {
  id?: number | string;
  description?: string;
  link?: string;
  photos?: string[];
  country?: string;
  name?: string;
  type?: ProjectTypes;
}

export type ProjectVMFromDTO = ReturnType<typeof toProjectVM>;

export type ProjectListElVM = ReturnType<typeof toProjectListElVM>;
