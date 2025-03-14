import {Request, Response} from 'express';

import Tour from "../../models/tour.model";
import Category from '../../models/category.model';


// [GET] /categorys/
export const index =  async (req: Request, res: Response) => {
  // SELECT * FROM tours WHERE deleted = false AND status = 'active';

  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: 'active',
    },
    raw: true
  });

  res.render("client/pages/categories/index.pug", {
    categories: categories,
    pageTitle: 'Danh Sách Bộ Sưu Tập'
  });
}