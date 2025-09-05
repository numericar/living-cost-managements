import express, { Router, Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";
import authRouter from "../routes/auths.route";

const router: Router = express.Router();

router.use("/api/v1/auths", authRouter);

router.get("", (req: Request, res: Response) => {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: "Path not found",
        data: null
    };

    return res.status(404).json(response);
});

export default router;