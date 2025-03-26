import {Request, Response} from 'express';

import Category from '../../models/category.model';


// [GET] /categorys/
export const index =  async (req: Request, res: Response) => {
  // SELECT * FROM tours WHERE deleted = false;

  const categories = await Category.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });

  res.render("admin/pages/categories/index.pug", {
    categories: categories,
    pageTitle: 'Danh Sách Bộ Sưu Tập'
  });
}