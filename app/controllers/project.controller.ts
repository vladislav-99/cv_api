import {NextFunction, Request, Response} from 'express';
import HttpException from '../exceptions/http.exception';
import {
  mapDtoToVm,
  mapVmToDto
} from '../mappers/project.mapper';
import {ProjectEtyToDTO, ProjectVm} from '../mappers/types/project.types';
import projectService from '../services/project.service';
import projectImageService from '../services/projectImage.service';
import {
  arrayDifference,
  isArrayEquals
} from "../utils/array";
import cloudinaryService from '../services/cloudinary.service';
import {getProjectImageName} from "../mappers/projectImage.mapper";

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {skip, take} = req.query;

    const options = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    };

    const projectDTOs = await projectService.getProjects(options);

    // const projectsList = projects.map((p) => mapDtoToVm.listProjects(p));

    res.json(projectDTOs);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {id} = req.params;

    const projectDTO = await projectService.getProjectById(Number(id));

    if (!projectDTO) {
      next(new HttpException(404, 'Project is not found'));
    } else {
      res.json(projectDTO);
    }
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const projectModel: ProjectVm = req.body;

  try {
    const projectDTO = mapVmToDto.createdProject(projectModel);

    const createdProject = await projectService.createProject(projectDTO);

    if (projectModel.photos) {
      const photosIds: number[] = projectModel.photos;
      await projectImageService.setProjectIdToPhotos(createdProject.id, photosIds);
    }

    const updatedProjectDTO = await projectService.getProjectById(createdProject.id);

    const projectVM = mapDtoToVm.project(updatedProjectDTO);

    res.status(200).json(projectVM);
  } catch (error) {
    if (projectModel.photos?.length) {
      const photosIds: number[] = projectModel.photos;
      const photos = await projectImageService.getProjectImagesById(photosIds);
      await projectImageService.deleteProjectImages(photosIds);
      await cloudinaryService.deleteImages(photos.map(({url}) => getProjectImageName(url)));
    }
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {id} = req.params;
    const projectModel: ProjectVm = {
      id,
      ...req.body,
    };

    const projectDTO = mapVmToDto.updatedProject(projectModel);

    let updatedProjectDTO: ProjectEtyToDTO = await projectService.updateProject(projectDTO);


    if (projectModel.photos) {
      const newPhotosIds = projectModel.photos;
      const oldPhotosIds = updatedProjectDTO.photos.map(({id}) => id);

      console.log('newPhotosIds', newPhotosIds);
      console.log('oldPhotosIds', oldPhotosIds);

      if (!isArrayEquals(newPhotosIds, oldPhotosIds)) {
        // update images in database and cloud

        const deletingPhotosIds = arrayDifference<number>(oldPhotosIds, newPhotosIds);
        console.log('deletingPhotosIds', deletingPhotosIds);

        if(deletingPhotosIds.length) {
          const deletingImages = await projectImageService.getProjectImagesById(deletingPhotosIds);
          await cloudinaryService.deleteImages(deletingImages.map(image => getProjectImageName(image.url)));
        }
        await projectImageService.deleteProjectImages(deletingPhotosIds);
        await projectImageService.setProjectIdToPhotos(updatedProjectDTO.id, newPhotosIds);
        updatedProjectDTO = await projectService.getProjectById(updatedProjectDTO.id);
      }
    }

    const projectVM = mapDtoToVm.project(updatedProjectDTO);

    res.status(200).json(projectVM);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const deletedProject = await projectService
      .deleteProject(id)
      .catch((err) => {
        next(err);
      });

    if (deletedProject) {
      const imageNames = deletedProject.photos.map(({url}) => getProjectImageName(url));
      const imageIds = deletedProject.photos.map(({id}) => id);
      await projectImageService.deleteProjectImages(imageIds);
      await cloudinaryService.deleteImages(imageNames);

      res.json({success: true, deletedProject});
    } else {
      res.status(400).json({success: false});
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, 'Something went wrong'));
  }
};
