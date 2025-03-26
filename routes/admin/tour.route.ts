import {Router} from "express";

import * as controller from '../../controllers/admin/tour.controller';

const router: Router = Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.createPost);



export const toursRoutes: Router = router;