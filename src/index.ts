import Web3Provider from "./provider/Web3Provider";
import BlocksRepository from "./repository/BlocksRepository"
import {Block} from "web3-eth"
import EthBlock from "./entities/EthBlock";

const web3 = new Web3Provider().provideWeb3()
const blocksRepository = new BlocksRepository()

async function startParsing() {
    blocksRepository.getLastScannedBlock().then(lastScannedBlockNumber => {
        console.log(`lastScannedBlockNumber = ${lastScannedBlockNumber}`)

        const blocksPromises = [] as any
        const start = lastScannedBlockNumber + 1
        const end = start + 100
        for (let i = start; i <= end; i++) {
            blocksPromises.push(web3.eth.getBlock(i), false)
        }

        Promise.all(blocksPromises).then(blocks => {
            const ethBlocks = [] as any

            blocks.forEach(block => {
                if (block) { // not sure why some are returning as `false`, also blocks.length shows 20
                    const b = <Block>block
                    const ethBlock: EthBlock = {
                        blockNumber: b.number
                    }

                    ethBlocks.push(ethBlock)
                }
            })

            blocksRepository.persistBlock(ethBlocks)
        })
    })

    setTimeout(startParsing, 5000);
};

startParsing()
