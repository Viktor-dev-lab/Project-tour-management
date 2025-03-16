import { Request, Response } from "express";
import sequelize from "../../config/database"; // Đảm bảo import đúng
import { QueryTypes } from "sequelize";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {

  res.render("client/pages/cart/index.pug", {
    pageTitle: "Trang Giỏ Hàng",
  });
};
