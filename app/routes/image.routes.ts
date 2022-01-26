import { Router } from 'express';
import cloudinary from 'cloudinary';
import HttpException from '../exceptions/http.exception';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


const router = Router();

router.post('/image', async (req, res, next) => {

  try {
    if (req.files) {
      const image = req.files.image;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await cloudinary.v2.uploader.upload(image.path);
      res.json({
        img_url: result.url
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(new HttpException(400, 'Cannot save image file'));
  }
});


router.delete('/image/:filename', async (req, res, next) => {
  try {
    const filename = req.params.filename.split('.')[0];

    const response = await cloudinary.v2.uploader.destroy(filename);

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
});

export default router;