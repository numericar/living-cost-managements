import { db } from "../configs/db.config";
import ICreateBoxDto from "../dtos/services/boxs/createBox.dto";

export async function createBox(box: ICreateBoxDto) {
    const sqlCommands: string = "INSERT INTO living_cost_profiles (user_id, provice_id, county_id, profile_name, base_income) VALUES (?, ?, ?, ?, ?)";
    const sqlParams: any[] = [box.userId, box.proviceId, box.countyId, box.profileName, box.baseIncome];

    await db.query(sqlCommands, sqlParams);
}