import { Request, Response } from "express";
import sequelize from "../../config/database"; // Đảm bảo import đúng
import { QueryTypes } from "sequelize";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  const tours = await sequelize.query(
    `SELECT tours.*, ROUND(price * (1 - discount/100),0) AS price_special
     FROM tours
     JOIN tours_categories ON tours.id = tours_categories.tour_id
     JOIN categories ON tours_categories.category_id = categories.id
     WHERE 
       categories.slug = ?
       AND categories.deleted = false
       AND categories.status = 'active'
       AND tours.deleted = false
       AND tours.status = 'active';`,
    {
      replacements: [slugCategory], // Truyền biến an toàn
      type: QueryTypes.SELECT, // Dùng QueryTypes từ Sequelize module
    }
  );

  tours.forEach(item => {
    if (item['images']){
      const images = JSON.parse(item["images"]);
      item["images"] = images[0];
    }
    item["price_special"] = parseFloat(item["price_special"]);
  });

  res.render("client/pages/tours/index.pug", {
    tours: tours,
    pageTitle: "Danh Sách Tours",
  });
};


export const detail = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  const toursDetail = await Tour.findOne({
    where: {
      deleted: false,
      status: 'active',
      slug: slugCategory
    },
    raw: true
  });

  toursDetail["images"] = JSON.parse(toursDetail["images"]);  
  toursDetail["price_special"] = toursDetail["price"] * (1-toursDetail["discount"]/100);
  console.log(toursDetail)

  res.render("client/pages/tours/detail.pug", {
    toursDetail: toursDetail,
    pageTitle: "Danh Sách Tours",
  });
};
