import express, { Express, Request, Response } from "express";
import router from "./middlewares/route.middleware";
import { setupSwagger } from "./configs/swagger.config";

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(router);

setupSwagger(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});