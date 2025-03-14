import express, {Express, Request, Response} from 'express';

import Tour from "../../models/tour.model";


// [GET] /tours/
export const index =  async (req: Request, res: Response) => {
  const tours = await Tour.findAll({raw: true});

  res.render("client/pages/tours/index.pug", {
    tours: tours
  });
}