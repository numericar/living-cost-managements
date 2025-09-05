import bcrypt from "bcrypt";

const salt: number = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
    const hash: string = await bcrypt.hash(plainPassword, salt);

    return hash;
}

export async function checkPassword(plainPassword: string, passwordHashed: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(plainPassword, passwordHashed);

    return match;
}