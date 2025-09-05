import { Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";
import ISignUpRqDto from "../dtos/requests/auths/signUpRq.dto";
import { badRequest, resourceConflict, successful } from "../utils/response.utils";
import * as userValidator from "../services/userValidator.service";
import * as passwordUtils from "../utils/password.utils";
import * as userService from "../services/user.service";
import { IUserCreateDto } from "../dtos/services/users/userCreate.dto";

export function healthCheck(req: Request, res: Response) {
    const response: IBaseResponse<null> = {
        isSuccess: true,
        message: "Successful",
        data: null
    };

    res.status(200).json(response);
}

export async function signUp(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body as ISignUpRqDto; 

    // validate data
    if (email.trim().length <= 0) return badRequest(res, `Field email should not be empty`);
    if (password.trim().length <= 0) return badRequest(res, `Field password should not be empty`);
    if (firstName.trim().length <= 0) return badRequest(res, `Field firstName should not be empty`);
    if (lastName.trim().length <= 0) return badRequest(res, `Field lastName should not be empty`);

    // check email is exist
    if (await userValidator.isExist(email)) return resourceConflict(res, "Email is exist");

    // hash password
    const passwordHashed: string = await passwordUtils.hashPassword(password);

    const userCreate: IUserCreateDto = {
        email: email,
        password: passwordHashed,
        firstName: firstName,
        lastName: lastName
    };

    await userService.createUser(userCreate);

    return successful<null>(res, null);
}