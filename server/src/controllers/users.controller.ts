import { Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";

export function healthCheck(req: Request, res: Response) {
    console.log(req.user);

    const response: IBaseResponse<any> = {
        isSuccess: true,
        message: "Successful",
        data: req.user
    };

    res.status(200).json(response);
}
