import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('blocks', (table) => {
    table.integer('blockNumber').primary()
    table.string('hash').notNullable()
    table.integer('timestamp').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('blocks')
}
