import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import createImageDirectory from '../helpers/dirCheck';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    createImageDirectory();
    const imagePath = path.join(process.cwd(), '..', 'images');
    cb(null, imagePath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
