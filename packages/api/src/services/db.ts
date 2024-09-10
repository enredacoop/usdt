import { UUID } from 'crypto';
import db from '../config/db';
import { camelToSnake } from '../config/db/utils';

function getRecords() {
    return db('records').select('*');
}

type RecordParams = {
    id: UUID;
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
    analysisId?: string;
};
function updateRecord(id: UUID, params: UpdateRecordParams) {
    let prms = camelToSnake(params);
    return db('records').update(prms).where({ id }).returning('*');
}

function deleteRecord(id: UUID) {
    return db('records').del().where({ id });
}

function getResults(id: UUID) {
    return db('records').select(['analysis_id', 'analysis_results', 'document_metadata']).where({ id }).first();
}

const dbService = { getRecords, getRecord, getVerifiedRecord, createRecord, updateRecord, deleteRecord, getResults };

export default dbService;
