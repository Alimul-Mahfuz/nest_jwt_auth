import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { BlacklistedToken } from "./entity/blacklistToken";

@Injectable()
export class TockenBlackListingService {

    constructor(
        @InjectRepository(BlacklistedToken)
        private readonly tokenblacklistRepository: Repository<BlacklistedToken>,
        private readonly entityManager: EntityManager
    ) { }

    async add(token: { token: string }) {
        try {
            const newEntry = new BlacklistedToken(token)

            const tokenEntry = await this.entityManager.save(newEntry)
            
            return tokenEntry

        } catch (error) {
            return false
        }
    }


    async isExist(token: string) {
        const blacklist = await this.tokenblacklistRepository.findOneBy({ token: token })
        if (!blacklist) {
            return true
        }
        return false
    }

}