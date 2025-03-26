import OrderItem from "./order-item.model";
import Tour from "./tour.model";
import Order from "./order.model";

// Định nghĩa quan hệ
OrderItem.belongsTo(Tour, { foreignKey: "tourId", as: "tour" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

Tour.hasMany(OrderItem, { foreignKey: "tourId", as: "orderItems" });

export default function setupAssociations() {
  console.log("Associations setup complete");
}
