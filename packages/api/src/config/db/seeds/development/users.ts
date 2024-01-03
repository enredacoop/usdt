import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { name: 'User 1', email: 'user1@usdt.org' },
        { name: 'User 2', email: 'user2@usdt.org' },
        { name: 'User 3', email: 'user3@usdt.org' }
    ]);
}
