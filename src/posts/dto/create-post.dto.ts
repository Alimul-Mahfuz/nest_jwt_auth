import { IsNotEmpty } from "class-validator"
import { User } from "src/users/entities/user.entity"

export class CreatePostDto {
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    content:string
    @IsNotEmpty()
    user:number
}
