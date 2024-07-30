const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['jpg', 'jpeg', 'png'];
    const allowedVideoTypes = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
    const extname = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowedImageTypes.includes(extname) || allowedVideoTypes.includes(extname)) {
        cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: 800000,
    fileFilter: fileFilter
});
  
module.exports = upload;