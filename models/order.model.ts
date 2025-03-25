import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("order", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(10),
    },
    status: {
      type: DataTypes.STRING(20),
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
  }, 
  {
    tableName: "orders",
    timestamps: true // Auto createdAt, updateAt
  }
);

export default Order;