import express, { Express, Request, Response } from "express";
import router from "./middlewares/route.middleware";
import { setupSwagger } from "./configs/swagger.config";
import cookieParser from "cookie-parser";

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(cookieParser())
app.use(router);

setupSwagger(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});