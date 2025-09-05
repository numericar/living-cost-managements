import express, { Express, Request, Response } from "express";
import router from "./middlewares/route.middleware";

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});