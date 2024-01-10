import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('records', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('token').nullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.string('name').nullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('records');
}
