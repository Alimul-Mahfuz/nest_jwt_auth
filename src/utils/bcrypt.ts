import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword:string){
    const salt = await bcrypt.genSalt();
    const password = rawPassword;
    return await bcrypt.hash(password, salt);
}



export async function comparePassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
}