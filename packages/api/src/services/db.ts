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
    email: string;
    token: string;
};
function createRecord(params: CreateRecordParams) {
    return db('records').insert(params).returning('*');
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
