import express, { Router, Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";
import authsRouter from "../routes/auths.route";
import usersRouter from "../routes/users.route";
import boxsRouter from "../routes/boxs.route";

const router: Router = express.Router();

router.use("/api/v1/auths", authsRouter);
router.use("/api/v1/users", usersRouter);
router.use("/api/v1/boxs", boxsRouter);

router.get("", (req: Request, res: Response) => {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: "Path not found",
        data: null
    };

    return res.status(404).json(response);
});

export default router;