import knex from "../../db/dao";
import EthBlock from "../entities/EthBlock";

export default class BlocksRepository {
    readonly BLOCKS_TABLE = 'blocks';

    async getLastScannedBlock() {
        let lastScannedBlockNumber = await knex
            .orderBy('blockNumber', 'desc')
            .from(this.BLOCKS_TABLE)
            .first();

        if (lastScannedBlockNumber === undefined) {
            return 0
        }

        return lastScannedBlockNumber.blockNumber
    }

    async persistBlock(blocks: []) {
        await knex(this.BLOCKS_TABLE).insert(blocks)
    }
}