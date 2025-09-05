import { db } from "../configs/db.config";
import { IUserCreateDto } from "../dtos/services/users/userCreate.dto";

export async function createUser(user: IUserCreateDto): Promise<void> {
    const sqlCommands: string = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
    const sqlParams: any[] = [user.email, user.password, user.firstName, user.lastName];

    await db.query(sqlCommands, sqlParams);
}