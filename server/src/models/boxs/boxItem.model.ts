import { RowDataPacket } from "mysql2";

export default interface IBoxItemModel extends RowDataPacket {
    id: number;
    coverPhotoUrl: string;
    itemName: string;
    itemType: number;
    money: number;
    moneyType: number;
    isMainLiving: boolean;
}