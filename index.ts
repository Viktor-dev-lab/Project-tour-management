import express, {Express} from 'express';
import dotenv from "dotenv";
import clientRoutes from './routes/client/index.route';

dotenv.config();

const app: Express = express();
const port: Number | string = process.env.PORT || 3000;

// Cấu hình view engine Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Client Route
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});