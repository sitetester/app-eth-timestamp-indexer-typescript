import EthBlock from '../entities/EthBlock';
import dao from '../../db/dao';

export default class BlocksRepository {
    readonly BLOCKS_TABLE = 'blocks';

    async getLastScannedBlock() {
        const lastScannedBlockNumber = await dao
            .orderBy('blockNumber', 'desc')
            .from(this.BLOCKS_TABLE)
            .first();

        if (lastScannedBlockNumber === undefined) {
            return 0;
        }

        return lastScannedBlockNumber.blockNumber;
    }

    async persistBlocks(blocks: EthBlock[]) {
        await dao(this.BLOCKS_TABLE).insert(blocks);
    }
}