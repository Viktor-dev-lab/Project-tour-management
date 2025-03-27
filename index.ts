import express, {Express} from 'express';
import dotenv from "dotenv";
import clientRoutes from './routes/client/index.route';
import setupAssociations from "./models/association";
import adminRoutes from './routes/admin/index.route';
import { systemConfig } from './config/system';
import path from "path"

dotenv.config();

const app: Express = express();
const port: Number | string = process.env.PORT || 3000;

app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce"))) // tinymce
app.use(express.static("public")); // path css
app.use(express.json()); // Middleware xử lý JSON
app.use(express.urlencoded({ extended: true })); // Hỗ trợ form data

// Cấu hình view engine Pug
app.set("view engine", "pug");
app.set("views", "./views");

// App public variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Thiết lập quan hệ giữa các model
setupAssociations();
// Route
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});