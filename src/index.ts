import { Block } from 'web3-eth'
import Web3Provider from './provider/Web3Provider'
import BlocksRepository from './repository/BlocksRepository'
import EthBlock from './entities/EthBlock'
import TransactionsRepository from './repository/TransactionsRepository'

const web3 = new Web3Provider().provideWeb3()
const blocksRepository = new BlocksRepository()
const transactionsRepository = new TransactionsRepository()

async function startParsing () {
  blocksRepository.getLastScannedBlock().then((lastScannedBlockNumber) => {
    console.log(`lastScannedBlockNumber =  ${lastScannedBlockNumber}`)

    const blocksPromises = [] as any
    const start = lastScannedBlockNumber + 1
    const end = start + 99
    for (let i = start; i <= end; i++) {
      blocksPromises.push(web3.eth.getBlock(i + '', true))
    }

    Promise.all(blocksPromises).then(
      (parsedBlocks) => {
        const ethBlocks = [] as any

        parsedBlocks.forEach(parsedBlock => {
          if (parsedBlock) { // not sure why some are returning as `false`, also blocks.length shows double length
            const block = <Block>parsedBlock

            if (block.number !== undefined) {
              const ethBlock: EthBlock = {
                blockNumber: block.number,
                hash: block.hash,
                timestamp: block.timestamp as number
              }

              ethBlocks.push(ethBlock)
            }

            if (Array.isArray(block.transactions) && block.transactions.length > 0) {
              transactionsRepository.persistTransactions(block.transactions)
            }
          }
        })

        blocksRepository.persistBlocks(ethBlocks)
      }
    )

    // delay is good,
    // without sqllite could generate "TOO MANY CONNECTIONS"
    // Infura could return "project ID request rate exceeded"
    setTimeout(startParsing, 3000)
  })
}

startParsing()
