import { DataSource, Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostRepository extends Repository<Post> {
    constructor(private dataSource: DataSource)
    {
        super(Post, dataSource.createEntityManager());
    }
    async findPostByUser(userId: number) {
        return this.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .select(['post', 'user.email'])
            .where("user.id=:userId", { userId })
            .orderBy("post.id", "DESC")
            .getMany()
    }



}