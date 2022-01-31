import { ProjectImageMv } from './types/projectImage.types';

export const mapVmToDto = {
  created: ({ id, ...image }: ProjectImageMv) => ({
    ...image
  }),
  updated: ({ id, ...image }: ProjectImageMv) => ({
    ...image,
    id: id!
  }),
};

export const getProjectImageName = (url: string) => url.split('/').reverse()[0].split('.')[0];