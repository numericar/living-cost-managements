import { db } from "../configs/db.config";

export async function isExist(email: string): Promise<boolean> {
    const sqlCommand: string = "SELECT u.id FROM users u WHERE u.email = ?";
    const sqlParams: any[] = [email];

    const [rows] = await db.query(sqlCommand, sqlParams);

    const isExist: boolean = (rows as any[]).length > 0;
    return isExist;
}