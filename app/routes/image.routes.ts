import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import fs from 'fs';
import HttpException from '../exceptions/http.exception';

cloudinary.v2.config({
  cloud_name:  process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

let storage;
if (process.env.NODE_ENV === 'production') {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, 'build'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    }
  });
} else {
  storage = multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, 'images/');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().valueOf() +
          '_' +
          file.originalname
        );
      }
    }
  );
}


const uploads = multer({ storage: storage });

const router = Router();

router.post('/image', uploads.single('image'), async (req, res, next) => {
  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);

      fs.unlinkSync(req.file.path);
      res.json({
        img_url: result.url
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(new HttpException(400, 'Cannot save image file'));
  }
});

router.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, 'images/' + filename);
  return res.sendFile(fullfilepath);
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