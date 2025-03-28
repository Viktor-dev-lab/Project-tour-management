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

  for (const item of category){
    item["link"] = `/tours/${item["slug"]}`
  }

  category["header"] = "Khám phá sản phẩm vietravel"
  category["description"] = "Hãy tận hưởng trải nghiệm du lịch chuyên nghiệp, mang lại cho bạn những khoảnh khắc tuyệt vời và nâng tầm cuộc sống. Chúng tôi cam kết mang đến những chuyến đi đáng nhớ, giúp bạn khám phá thế giới theo cách hoàn hảo nhất."

  const dataPoster = [
    {
      title: "Khám phá thiên nhiên hùng vĩ",
      description: "Trải nghiệm những chuyến đi đầy thú vị với phong cảnh ngoạn mục từ núi non hùng vĩ đến bãi biển trong xanh.",
    },
    {
      title: "Văn hóa và ẩm thực địa phương",
      description: "Thưởng thức những món ăn đặc sản và tìm hiểu nét đẹp văn hóa truyền thống của từng vùng miền.",
    },
    {
      title: "Những địa điểm không thể bỏ lỡ",
      description: "Khám phá các điểm đến hấp dẫn nhất, từ di tích lịch sử đến các khu vui chơi giải trí hiện đại.",
    }
  ];



  const slidesData = [];

  for (const item of tour) {
    if (item["images"]) { 
      let data = {
        title: item["title"],
        image: JSON.parse(item["images"])[0],
        link: `/tours/detail/${item["slug"]}`
      }
      slidesData.push(data)
    }
  }

  res.render("client/pages/dashboard/index.pug", {
    pageTitle: "Trang chủ",
    tour: tour,
    category: category,
    dataPoster: dataPoster,
    slidesData: slidesData
  });
};

