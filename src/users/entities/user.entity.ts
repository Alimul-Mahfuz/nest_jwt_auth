import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
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


    @OneToMany(()=>Post,(post)=>post.user)
    post:Post[]


    constructor(user:Partial<User>) {
        Object.assign(this,user)
    }
}
