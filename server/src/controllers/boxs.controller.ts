import { Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";
import { badRequest, successful } from "../utils/response.utils";
import ICreateBoxRqDto from "../dtos/requests/boxs/createBoxs.dto";
import ICreateBoxDto from "../dtos/services/boxs/createBox.dto";
import * as boxsService from "../services/boxs.service";
import IBoxProfileDto from "../dtos/services/boxs/boxProfile.dto";
import IBoxProfileRsDto from "../dtos/responses/boxs/boxProfileRs.dto";

export function healthCheck(req: Request, res: Response) {
    const response: IBaseResponse<null> = {
        isSuccess: true,
        message: "Successful",
        data: null
    };

    res.status(200).json(response);
}

export async function createBoxs(req: Request, res: Response) {
    try {
        const { profileName, proviceId, countyId, baseIncome } = req.body as ICreateBoxRqDto;

        if (profileName.trim().length <= 0) return badRequest(res, "Field email should not be empty");
        if (baseIncome <= 0) return badRequest(res, "Field base income should more than zero");

        const box: ICreateBoxDto = {
            userId: req.user!.id,
            profileName: profileName,
            proviceId: proviceId,
            countyId: countyId,
            baseIncome: baseIncome
        };

        await boxsService.createBox(box); 

        return successful<null>(res, null);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return badRequest(res, e.message);
        }

        return badRequest(res, String(e));
    }
}  

export async function getBoxs(req: Request, res: Response) {
    try {
        const boxs: IBoxProfileDto[] = await boxsService.getBoxsByUserId(req.user!.id);

        const boxResponses: IBoxProfileRsDto[] = [];
        for (let boxItem of boxs) {
            boxResponses.push({
                id: boxItem.id,
                profileName: boxItem.profileName,
                proviceName: boxItem.proviceName,
                countyName: boxItem.countyName
            });
        }

        return successful<IBoxProfileRsDto[]>(res, boxResponses);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return badRequest(res, e.message);
        }

        return badRequest(res, String(e));
    }
}