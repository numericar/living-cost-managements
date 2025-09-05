import { Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";

export function healthCheck(req: Request, res: Response) {
    const response: IBaseResponse<null> = {
        isSuccess: true,
        message: "Successful",
        data: null
    };

    res.status(200).json(response);
}