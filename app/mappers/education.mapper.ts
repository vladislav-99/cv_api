import { EducationMv } from './types/education.types';

export const mapVmToDto = {
  updated: (model: EducationMv) => {
    const id = Number(model.id);
    return {
      id,
      name: model.name && model.name.trim(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created: (model: EducationMv) => ({
    name: model.name!.trim(),
  }),
  createdMany: (educations: string[]) => (
    educations.filter((value, index, self) => self.indexOf(value) === index).map(name => ({
      name
    }))
  ),
};
