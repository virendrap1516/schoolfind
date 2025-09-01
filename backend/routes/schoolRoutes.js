
// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { addSchool, getSchools, deleteSchool, editSchool } from '../controllers/schoolController.js';

// const router = express.Router();


// const uploadDir = path.join(process.cwd(), 'uploads', 'schoolImages');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });


// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
//   }
// };


// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// router.post('/add', upload.single('image'), addSchool);
// router.get('/all', getSchools);
// router.delete('/:id', deleteSchool); 
// router.put('/:id', upload.single('image'), editSchool);

// export default router;


import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { addSchool, getSchools, deleteSchool, editSchool } from '../controllers/schoolController.js';

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'schoolImages');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});


router.post('/add', upload.single('image'), addSchool);      
router.get('/all', getSchools);                              
router.delete('/:id', deleteSchool);                        
router.put('/:id', upload.single('image'), editSchool);    

export default router;

