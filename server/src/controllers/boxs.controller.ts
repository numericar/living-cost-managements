import { Request, Response } from "express";
import IBaseResponse from "../dtos/base/baseResponse.dto";
import { badRequest, successful, unauthorized, notFound } from "../utils/response.utils";
import ICreateBoxRqDto from "../dtos/requests/boxs/createBoxs.dto";
import ICreateBoxDto from "../dtos/services/boxs/createBox.dto";
import * as boxsService from "../services/boxs.service";
import IBoxProfileDto from "../dtos/services/boxs/boxProfile.dto";
import IBoxProfileRsDto from "../dtos/responses/boxs/boxProfileRs.dto";
import * as boxValidators from "../services/boxValidator.service";
import IBoxProfileModel from "../models/boxs/boxProfile.model";
import IBoxItemModel from "../models/boxs/boxItem.model";
import BoxByIdRs, { FinancialBurden, FinancialRemaining } from "../dtos/responses/boxs/boxByIdRs.dto";
import FinanceBoxTypeEnum from "../enums/financeItemType.enum";
import MoneyTypeEnum from "../enums/moneyType.enum";

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

export async function getBoxById(req: Request, res: Response) {
    try {
        // validate user is owner of box
        const { boxId } = req.params;
        
        const isOwner: boolean = await boxValidators.isOwner(req.user!.id, Number(boxId));
        if (!isOwner) return unauthorized(res);

        // get box profile
        const boxModel: IBoxProfileModel | null = await boxsService.getBoxById(Number(boxId));
        if (boxModel === null) return notFound(res);

        console.log(boxModel)

        // get box item
        const boxItemModel: IBoxItemModel[] | null = await boxsService.getBoxItemByBoxId(Number(boxId));

        const boxResult: BoxByIdRs = {
            profileName: boxModel.profileName,
            proviceName: boxModel.proviceName,
            countyName: boxModel.countyName,
            baseIncome: boxModel.baseIncome,
            financialBurden: null,
            financialRemaining: null
        };

        const financialBurden: FinancialBurden = {
            amount: 0,
            financialItems: []          
        }

        const financialRemaining: FinancialRemaining = {
            amount: 0,
            financialItems: []
        }
        
        let burdenAmount: number = 0;
        let remainingAmount: number = 0;
        if (boxItemModel !== null) {
            // sum burden amount
            for (let item of boxItemModel) {
                if (item.itemType === FinanceBoxTypeEnum.BURDEN) {
                    burdenAmount += item.money;
                }
            }

            // sum remaining amountg
            let tempRemainingAmount = boxResult.baseIncome - burdenAmount;
            remainingAmount = (tempRemainingAmount > 0) ? tempRemainingAmount : 0;

            for (let item of boxItemModel) {
                if (item.itemType === FinanceBoxTypeEnum.BURDEN) { // burder
                    financialBurden.amount += item.money;
                    financialBurden.financialItems.push({
                        id: item.id,
                        itemName: item.itemName,
                        amount: item.money,
                        photoCoverUrl: item.coverPhotoUrl
                    });
                } else if (item.itemType === FinanceBoxTypeEnum.REMAINING) { // remaining
                    let amount: number = 0;
                    if (remainingAmount > 0 && item.moneyType === MoneyTypeEnum.PERCENT) {
                        amount = remainingAmount * (item.money / 100.0)
                    } else if (item.moneyType === MoneyTypeEnum.MONEY) {
                        amount = item.money;
                    }

                    financialRemaining.amount += amount;
                    financialRemaining.financialItems.push({
                        id: item.id,
                        itemName: item.itemName,
                        amount: amount,
                        photoCoverUrl: item.coverPhotoUrl
                    });
                }
            }
        }

        boxResult.financialBurden = financialBurden;
        boxResult.financialRemaining = financialRemaining;
        return successful<BoxByIdRs>(res, boxResult);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return badRequest(res, e.message);
        }

        return badRequest(res, String(e));
    }
}