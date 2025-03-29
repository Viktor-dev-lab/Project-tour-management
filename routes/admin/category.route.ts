import {Router} from "express";

import * as controller from '../../controllers/admin/category.controller';

const router: Router = Router();

router.get('/', controller.index);
router.patch('/change-status/:id', controller.changeStatus);
router.delete('/delete/:id', controller.deleteCategory);

export const categoryRoutes: Router = router;