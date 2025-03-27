import {Express} from 'express';
import { categoryRoutes } from './category.route';
import { toursRoutes } from './tour.route';
import { uploadRoutes } from './upload.route';

import {systemConfig} from '../../config/system'


const adminRoutes = (app: Express) : void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use( PATH_ADMIN + '/categories', categoryRoutes);
  app.use( PATH_ADMIN + '/tours', toursRoutes);
  app.use( PATH_ADMIN + '/upload', uploadRoutes);
}

export default adminRoutes;