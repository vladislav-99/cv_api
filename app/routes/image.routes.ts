import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import HttpException from '../exceptions/http.exception';

const imageUpload = multer({
  storage: multer.diskStorage(
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
  ),
});
const router = Router();

// get all projects
router.post('/image', imageUpload.single('image'), (req, res) => {
  res.json({
    img_url: `/image/${req.file?.filename}`
  });
});

router.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, 'images/' + filename);
  return res.sendFile(fullfilepath);
});

router.delete('/image/:filename', (req, res, next) => {
  try {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'images/' + filename);
    fs.unlinkSync(fullfilepath);
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new HttpException(400, 'Cannot delete image file'));
  }
});

export default router;