import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        nullable:false,
        length:50
    })
    title:string

    @Column({
        nullable:false,
        type:'text'
    })
    content:string


    @ManyToOne(()=>User,(user)=>user.post)
    user:User

    @CreateDateColumn({
        nullable:true
    })
    createdAt:Date

    @UpdateDateColumn({
        nullable:true
    })
    updatedAt:Date


    constructor(post:Partial<Post>){
        Object.assign(this,post)
    }



}
