import {Request, Response} from 'express';

import Tour from "../../models/tour.model";
import Order from "../../models/order.model";
import { generateOrderCode } from '../../helpers/generate';
import OrderItem from '../../models/order-item.model';


// [POST] /order
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

  for (const item of data.cart){
    const dataItem = {
      orderId: orderID,
      tourId: item.tourID,
      quantity: item.quantity
    }
    
    const tour = await Tour.findOne({
      where: {
        id: item.tourID,
        status: 'active',
        deleted: false
      }
    });

    dataItem["price"] = tour["price"];
    dataItem["discount"] = tour["discount"];
    dataItem["timeStart"] = tour["timeStart"];

    await OrderItem.create(dataItem);
  }

  res.status(200).json({
    code: 200,
    mesage: "Đặt hàng thành công",
    orderCode: newCode
  })
}



// [GET] /order/success
export const success =  async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode as string;

  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false
    },
    raw: true
  })

  const order_item = await OrderItem.findAll({
    where: {
      orderId: order["id"],
    },  
    include: [
      {
        model: Tour, // Nếu cần lấy thêm thông tin từ bảng Tour
        as: "tour", // THÊM alias đúng với alias trong quan hệ
        attributes: ["title", "price", "images", "slug"]
      }
    ],
    raw: true,
    nest : true
  })
  
  for (const item of order_item) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    item["total"] = item["price_special"] * item["quantity"];
    item["tour"].image = JSON.parse(item["tour"].images)?.[0] || null;

  }
  
  console.log(order)

  res.render('client/pages/order-item/index.pug', {
    pageTitle: "Đặt hàng thành công",
    order_item: order_item,
    order: order
  });
}