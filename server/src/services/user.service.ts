import { db } from "../configs/db.config";
import { IUserCreateDto } from "../dtos/services/users/userCreate.dto";
import { User } from "../models/users/user.model";

export async function createUser(user: IUserCreateDto): Promise<void> {
    const sqlCommands: string = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
    const sqlParams: any[] = [user.email, user.password, user.firstName, user.lastName];

    await db.query(sqlCommands, sqlParams);
}

export async function getUserByEmail(email: string): Promise<User> {
    const sqlCommands: string = "SELECT u.id, u.email, u.password FROM users u WHERE u.email = ?"
    const sqlParams: any[] = [email];

    const [rows] = await db.query<User[]>(sqlCommands, sqlParams);

    return rows[0];
}