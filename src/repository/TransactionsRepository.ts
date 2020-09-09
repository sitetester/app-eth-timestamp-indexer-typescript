import dao from '../../db/dao'
import { Transaction } from 'web3-eth'

export default class TransactionsRepository {
    readonly TRANSACTIONS_TABLE = 'transactions';

    async persistTransactions (transactions: Transaction[] | string[]) {
      await dao(this.TRANSACTIONS_TABLE).insert(transactions)
    }
}
