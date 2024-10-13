import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class BlacklistedToken{
    @PrimaryGeneratedColumn()
    id:string
    @IsNotEmpty()
    @Column({
        nullable:false,
        type:'text'
    })
    token:string
    constructor(token:Partial<BlacklistedToken>){
        Object.assign(this,token)
    }
}