import { Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";

export function successful<T>(res: Response, data: T) {
    const response: IBaseResponse<T> = {
        isSuccess: true,
        message: "Successful",
        data: data
    };
    
    return res.status(200).json(response);
} 

export function badRequest(res: Response, message: string) {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: message,
        data: null
    };
    
    return res.status(400).json(response);
}

export function resourceConflict(res: Response, message: string) {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: message,
        data: null
    };
    
    return res.status(409).json(response);
}

export function unauthorized(res: Response) {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: "Unauthorized",
        data: null
    };
    
    return res.status(401).json(response);
}

export function notFound(res: Response) {
    const response: IBaseResponse<null> = {
        isSuccess: false,
        message: "Content not found",
        data: null
    };
    
    return res.status(404).json(response);
}