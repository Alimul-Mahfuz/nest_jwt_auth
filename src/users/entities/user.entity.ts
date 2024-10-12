import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({
        nullable:false,
    })
    name:string

    @Column({
        unique:true,
        nullable:false,
    })
    email:string

    @Column({
        nullable:false
    })
    password:string


    constructor(user:Partial<User>) {
        Object.assign(this,user)
    }
}
