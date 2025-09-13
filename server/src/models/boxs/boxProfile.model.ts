import { RowDataPacket } from "mysql2";

export default interface IBoxProfileModel extends RowDataPacket {
    id: number;
    profileName: string;
    proviceName: string;
    countyName: string;
    baseIncome: number;
}