import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('records', (table) => {
        table.uuid('id').unique().primary();
        table.string('email').notNullable();
        table.string('token').nullable();
        table.timestamp('token_expires_at').nullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.string('name').nullable();
        table.string('analysis_id').nullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('records');
}
