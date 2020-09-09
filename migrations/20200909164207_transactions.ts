import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.integer('blockHash').notNullable()
    table.integer('blockNumber').notNullable()
    table.integer('from').nullable()
    table.integer('gas').notNullable()
    table.string('gasPrice').notNullable()
    table.string('hash').primary()
    table.string('input').notNullable()
    table.string('nonce').notNullable()
    table.string('r').notNullable()
    table.string('s').notNullable()
    table.integer('to').nullable()
    table.integer('transactionIndex').notNullable()
    table.integer('v').notNullable()
    table.integer('value').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('transactions')
}
