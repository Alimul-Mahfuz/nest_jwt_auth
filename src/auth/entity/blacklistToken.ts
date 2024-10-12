import { IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class BlacklistedToken{
    @PrimaryGeneratedColumn()
    id:string
    @IsNotEmpty()
    token:string


    constructor(token:Partial<BlacklistedToken>){
        Object.assign(this,token)
    }
}