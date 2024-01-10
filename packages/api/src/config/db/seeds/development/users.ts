import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('records').del();

    // Inserts seed entries
    await knex('records').insert([
        { name: 'Record 1', email: 'user1@usdt.org' },
        { name: 'Record 2', email: 'user2@usdt.org' },
        { name: 'Record 3', email: 'user3@usdt.org' }
    ]);
}
