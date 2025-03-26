import {Router} from "express";
import multer from "multer";
import * as controller from '../../controllers/admin/tour.controller';
import * as uploadClound from '../../middlewares/uploadClound.middleware';


const router: Router = Router();
const upload = multer();

router.get('/', controller.index);
router.get('/create', controller.create);

router.post(
  '/create', 
  upload.fields([{ name: 'images', maxCount: 10 }]),
  uploadClound.uploadFields,
  controller.createPost
);



export const toursRoutes: Router = router;


