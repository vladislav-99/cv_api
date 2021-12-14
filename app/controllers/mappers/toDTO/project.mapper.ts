import { ProjectVM } from "../toVM/types";

export const toProjectDTO = ({ id, name, type, ...project }: ProjectVM) => {
  return {
    name: name!.trim(),
    type: type!,
    ...project,
  };
};

export const toProjectUpdateDTO = ({ id, name, ...project }: ProjectVM) => {
  return {
    id: Number(id),
    name: name && name.trim(),
    ...project,
  };
};
