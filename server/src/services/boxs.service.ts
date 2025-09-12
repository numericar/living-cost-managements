import { db } from "../configs/db.config";
import IBoxProfileDto from "../dtos/services/boxs/boxProfile.dto";
import ICreateBoxDto from "../dtos/services/boxs/createBox.dto";

export async function createBox(box: ICreateBoxDto) {
    const sqlCommands: string = "INSERT INTO living_cost_profiles (user_id, provice_id, county_id, profile_name, base_income) VALUES (?, ?, ?, ?, ?)";
    const sqlParams: any[] = [box.userId, box.proviceId, box.countyId, box.profileName, box.baseIncome];

    await db.query(sqlCommands, sqlParams);
}

export async function getBoxsByUserId(userId: number): Promise<IBoxProfileDto[]> {
    const sqlCommands: string = `SELECT 
                                	lcp.lcp_id AS id,
                                	lcp.profile_name as profileName,
                                	p.name_th as proviceName,
                                	c.name_th as countyName
                                FROM living_cost_profiles lcp
                                INNER JOIN provices p ON lcp.provice_id = p.provice_id
                                INNER JOIN counties c ON lcp.county_id = c.county_id
                                WHERE lcp.user_id = ?`;
    const sqlParams: any[] = [userId];

    const result = await db.query<IBoxProfileDto[]>(sqlCommands, sqlParams);

    return result[0];
}