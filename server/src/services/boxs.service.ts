import { db } from "../configs/db.config";
import IBoxProfileDto from "../dtos/services/boxs/boxProfile.dto";
import ICreateBoxDto from "../dtos/services/boxs/createBox.dto";
import IBoxItemModel from "../models/boxs/boxItem.model";
import IBoxProfileModel from "../models/boxs/boxProfile.model";

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

export async function getBoxById(boxId: number): Promise<IBoxProfileModel | null> {
    const sqlCommands: string = `SELECT 
                                	lcp.lcp_id AS id,
                                	lcp.profile_name as profileName,
                                	p.name_th as proviceName,
                                	c.name_th as countyName,
                                    lcp.base_income as baseIncome
                                FROM living_cost_profiles lcp
                                INNER JOIN provices p ON lcp.provice_id = p.provice_id
                                INNER JOIN counties c ON lcp.county_id = c.county_id
                                WHERE lcp.user_id = ?`;
    const sqlParams: any[] = [boxId];
    const result = await db.query<IBoxProfileModel[]>(sqlCommands, sqlParams);

    return (result[0].length > 0) ? result[0][0] : null;
}

export async function getBoxItemByBoxId(boxId: number): Promise<IBoxItemModel[] | null> {
    const sqlCommand: string = `SELECT 
                                    lci.lci_id as id,
                                	lci.item_name AS itemName,
                                	lci.item_type AS itemType,
                                	lci.money,
                                	lci.money_type AS moneyType,
                                	lci.is_main_living AS isMainLiving,
                                	ip.url as coverPhotoUrl
                                FROM living_cost_items lci
                                INNER JOIN item_photos ip ON lci.cover_photo_id = ip.photo_id
                                WHERE 
                                	lci.lcp_id = ?`;
    const sqlParams: any[] = [boxId];
    const [rows] = await db.query<IBoxItemModel[]>(sqlCommand, sqlParams);

    return (rows.length > 0) ? rows : null;
}