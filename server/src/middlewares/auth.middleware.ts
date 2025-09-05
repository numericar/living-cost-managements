import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorized } from "../utils/response.utils";
import { UserPayload } from "../dtos/middlewares/userPayload.dto";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req.cookies["access_token"];

        if (typeof token === "undefined" || token.trim().length <= 0) return unauthorized(res);

        const secret: string = "zDE0kl1hfPlfxM65";
        const decoded = jwt.verify(token, secret);

        req.user = decoded as UserPayload
        next();
    } catch (e: unknown) {
        if (e instanceof Error) {
            return unauthorized(res);
        }
    }
}