import { UUID } from 'crypto';
import db from '../config/db';

function getRecords() {
    return db('records').select('*');
}

type RecordParams = {
    email: string;
    token: string;
    verified?: boolean;
};
function getRecord(params: RecordParams) {
    return db('records').select('*').where(params).first();
}

type GetVerifiedRecordParams = {
    email: string;
    token: string;
};
function getVerifiedRecord(params: GetVerifiedRecordParams) {
    return db('records')
        .select('*')
        .where({ ...params, verified: true })
        .first();
}

type CreateRecordParams = {
    id: UUID;
    email: string;
    token: string;
};
function createRecord(params: CreateRecordParams) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24);
    return db('records').insert({ ...params, token_expires_at: expiresAt });
}

type UpdateRecordParams = {
    name?: string;
    email?: string;
    token?: string;
    verified?: boolean;
};
function updateRecord(id: number, params: UpdateRecordParams) {
    return db('records').update(params).where({ id }).returning('*');
}

function deleteRecord(id: number) {
    return db('records').del().where({ id });
}

const dbService = { getRecords, getRecord, getVerifiedRecord, createRecord, updateRecord, deleteRecord };

export default dbService;
