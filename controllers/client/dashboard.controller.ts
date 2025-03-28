import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";

export const index = async (req: Request, res: Response) => {
  const tour = await Tour.findAll({
    where: {
      status: 'active',
      deleted: false
    },
    raw: true
  });

  const category = await Category.findAll({
    where: {
      status: 'active',
      deleted: false
    },
    raw: true
  });

  console.log(category)
  res.render("client/pages/dashboard/index.pug", {
    pageTitle: "Trang chủ",
    tour: tour,
    category: category
  });
};

