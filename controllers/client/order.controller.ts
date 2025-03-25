import {Request, Response} from 'express';

import Tour from "../../models/tour.model";
import Order from "../../models/order.model";
import Category from '../../models/category.model';
import { generateOrderCode } from '../../helpers/generate';


// [GET] /order/
export const index =  async (req: Request, res: Response) => {
  const data = req.body;

  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note:  data.info.note,
    status: "initial"
  }

  const order = await Order.create(dataOrder)
  const orderID = order.dataValues.id;

  const newCode = generateOrderCode(orderID);
  await Order.update(
    {code: newCode},
    {
      where: {
        id: orderID
      }
    }
  );

  res.status(200).json({
    code: 200,
    mesage: "Đặt hàng thành công"
  })
}