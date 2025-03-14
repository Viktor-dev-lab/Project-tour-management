import express, {Express} from 'express';
import dotenv from "dotenv";
import clientRoutes from './routes/client/index.route';

dotenv.config();

const app: Express = express();
const port: Number | string = process.env.PORT || 3000;

app.use(express.static("public")); // path css
app.use(express.json()); // Middleware xử lý JSON
app.use(express.urlencoded({ extended: true })); // Hỗ trợ form data

// Cấu hình view engine Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Client Route
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});