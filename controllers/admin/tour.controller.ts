import {Request, Response} from 'express';

import Tour from '../../models/tour.model';
import Category from '../../models/category.model';
import { generateTourCode } from '../../helpers/generate';
import slugify from 'slugify';
import { systemConfig } from '../../config/system';
import TourCategory from '../../models/tour-category.model';


// [GET] /tours/
export const index =  async (req: Request, res: Response) => {
  // SELECT * FROM tours WHERE deleted = false;

  const tours = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });

  tours.forEach(item => {
    if (item["images"]){
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
    item["price_special"] = (item["price"] * (1-item["discount"] / 100));
  })


  res.render("admin/pages/tours/index.pug", {
    tours: tours,
    pageTitle: 'Danh Sách Tour'
  });
}

// [GET] /tours/create
export const create =  async (req: Request, res: Response) => {

  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: 'active'
    },
    raw: true
  })

  res.render("admin/pages/tours/create.pug", {
    pageTitle: 'Thêm mới Tour',
    categories: categories
  });
}

// [POST] /tour/create
export const createPost =  async (req: Request, res: Response) => {
  const countTour = await Tour.count();
  const code = generateTourCode(countTour + 1);
  
  if (req.body.position === ""){
    req.body.position = countTour + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const dataTour = {
    title: req.body.title,
    code: code,
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: req.body.position,
    status: req.body.status,
    slug: slugify(`${req.body.title}-${Date.now()}`, { lower: true, strict: true,  locale: 'vi' })
  }

    
  const tour = await Tour.create(dataTour);
  const tourID = tour["id"];

  const dataTourCategory = {
    tour_id: tourID,
    category_id: parseInt(req.body.category_id)
  }

  await TourCategory.create(dataTourCategory)

  res.redirect(`/${systemConfig.prefixAdmin}/tours`);
}

