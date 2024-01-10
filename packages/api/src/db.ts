import db from './config/db';

function getUsers() {
    return db('users').select('*');
}

function getUser(id: number) {
    return db('users').select('*').where({ id }).first();
}

function createUser(name: string, email: string, token: string) {
    return db('users').insert({ name, email }).returning('*');
}

function updateUser(id: number, name: string, email: string) {
    return db('users').update({ name, email }).where({ id }).returning('*');
}

function deleteUser(id: number) {
    return db('users').del().where({ id });
}

const dbService = { getUsers, getUser, createUser, updateUser, deleteUser };

export default dbService;
