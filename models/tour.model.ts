import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify";

const Tour = sequelize.define("Tour", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255), // varchar
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
    },
    images: {
      type: DataTypes.TEXT('long'),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    information: {
      type: DataTypes.TEXT('long'),
    },
    schedule: {
      type: DataTypes.TEXT('long'),
    },
    timeStart: {
      type: DataTypes.DATE,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(20),
    },
    position: {
      type: DataTypes.INTEGER,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "tours",
    timestamps: true // Auto createdAt, updateAt
  }
);

// Trước khi Sequelize tạo một instance mới (create() hoặc build().save()), 
// nó sẽ chạy vào hook beforeCreate trước.
// Tour.beforeCreate((tour) => {
//   console.log('Inside beforeCreate hook for tour:', tour["title"]);
//   tour["slug"] = slugify(`${tour["title"]}-${Date.now()}`, {
//     lower: true, // Viết thường hết
//     strict: true // Loại bỏ kí tự đặc biệt
//   })
// })


export default Tour;