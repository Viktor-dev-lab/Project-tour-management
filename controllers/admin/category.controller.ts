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


// [PATCH] /admin/categories/change-status/:id
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);

    if (category) {
      category["status"] = category["status"] === "active" ? "inactive" : "active";
      await category.save();
      
      req.flash('success', 'Cập nhật trạng thái thành công');
      res.redirect("back");
    }

  } catch (error) {
    console.error(error);
  }
};

// [PATCH] /admin/categories/delete/:id
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID);

    if (category) {
      category["deleted"] = true;
      await category.save();
      
      req.flash('success', 'Xóa thành công');
      res.redirect("back");
    }

  } catch (error) {
    console.error(error);
  }
};