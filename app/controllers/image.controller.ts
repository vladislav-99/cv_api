import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
import formidable from 'formidable';

import projectImageService from '../services/projectImage.service';
import cloudinaryService from '../services/cloudinary.service';
import { ProjectImageCreateDTO } from '../mappers/types/projectImage.types';
import {getProjectImageName, mapVmToDto} from '../mappers/projectImage.mapper';


export const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {


    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

      if (files) {
        const image = files.image;

        // @ts-ignore  incorrect type from formidable
        const { size, name, path }: { size: number, name: string, path: string } = image;

        const result = await cloudinaryService.uploadImage(path);

        const projectImageDTO: ProjectImageCreateDTO = mapVmToDto.created({
          name,
          size,
          url: result.url
        });

        const savedImage = await projectImageService.createProjectImage(projectImageDTO);
        res.status(200).json(savedImage);
      }

    });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageId: number = Number(req.params.id);

    if(isNaN(imageId)) return next(new HttpException(404, 'Image not found'));

    const projectImageDTO = await projectImageService.deleteProjectImage(imageId);
    console.log(projectImageDTO);
    const imageName = getProjectImageName(projectImageDTO.url);

    const response = await cloudinaryService.deleteImage(imageName);

    if (response.result === 'ok') {
      return res.status(200).json({
        success: true
      });
    } else {
      next(new HttpException(404, 'Image not found'));
    }
  } catch (error) {
    next(new HttpException(400, 'Cannot delete image file'));
  }
};

export const deleteImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageIds: number[] = req.body.images;

    const projectImages = await projectImageService.getProjectImagesById(imageIds);

    const projectImagesNames = projectImages.map(({url}) => getProjectImageName(url));

    await projectImageService.deleteProjectImages(imageIds);

    const response = await cloudinaryService.deleteImages(projectImagesNames);

    if (response.deleted) {
      return res.status(200).json({
        success: true
      });
    } else {
      next(new HttpException(404, 'Image not found'));
    }
  } catch (error) {
    next(new HttpException(400, 'Cannot delete image file'));
  }
};