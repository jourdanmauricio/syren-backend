import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.gif' &&
      ext !== '.jpeg' &&
      ext !== '.webp'
    ) {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1048576, // 1 Mb allowed
  },
});
