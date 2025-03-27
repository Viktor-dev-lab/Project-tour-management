import {Router} from "express";
import multer from "multer";

import * as controller from '../../controllers/admin/upload.controller';
import * as uploadClound from "../../middlewares/uploadClound.middleware";

const upload = multer();
const router: Router = Router();

router.post(
  '/', 
  upload.single("file"),
  uploadClound.uploadSingle,
  controller.index
);

export const uploadRoutes: Router = router;


