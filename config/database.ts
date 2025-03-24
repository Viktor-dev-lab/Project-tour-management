import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
 process.env.DATABASE_NAME, // database name
 process.env.DATABASE_USERNAME, // username
 process.env.DATABASE_PASSWORD, // password
  {
    host: process.env.DATABASE_HOST, // link hosting
    port: parseInt(process.env.DATABASE_PORT), // port in mysql
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize;