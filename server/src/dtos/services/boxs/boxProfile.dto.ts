import { RowDataPacket } from "mysql2";

export default interface IBoxProfileDto extends RowDataPacket {
    id: number;
    profileName: string;
    proviceName: string;
    countyName: string;
}