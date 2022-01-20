import { Router } from 'express';
import multer from 'multer';
import path from 'path';

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
  console.log(req.file);
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

export default router;