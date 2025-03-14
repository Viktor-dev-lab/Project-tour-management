import express, {Express, Request, Response} from 'express';
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();
sequelize;
const app: Express = express();
const port: Number | string = process.env.PORT || 3000;

// Cấu hình view engine Pug
app.set("view engine", "pug");
app.set("views", "./views");

app.get('/', (req: Request, res: Response) => {
  res.render("client/pages/tours/index.pug")
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});