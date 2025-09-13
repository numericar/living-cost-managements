import { db } from "../configs/db.config";

export async function isOwner(userId: number, boxId: number): Promise<boolean> {
    const sqlCommand: string = "SELECT lcp.lcp_id FROM living_cost_profiles lcp WHERE lcp.lcp_id = ? AND lcp.user_id = ?";
    const sqlParams: any[] = [boxId, userId];

    const [rows] = await db.query(sqlCommand, sqlParams);

    const isExist: boolean = (rows as any[]).length > 0;
    return isExist;
} 