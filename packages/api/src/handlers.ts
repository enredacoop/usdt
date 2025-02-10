import { Request, Response } from 'express';
import crypto, { UUID } from 'crypto';
import dbService from './services/db';
import { mailerService } from './services/mailer';
import formidable from 'formidable';
import upoService from './services/upo';
import { finished, pipeline, Readable } from 'stream';

const API_URL = process.env.UPO_API as string;
const TOKEN = process.env.UPO_TOKEN as string;

async function waitAndNotify(uuid: UUID, name: string, analysisId: string, email: string) {
    const document_data = await upoService.pollApiForResult(analysisId);
    await dbService.updateRecord(uuid, { analysisResults: JSON.stringify(document_data) });
    await mailerService.sendResultLinkEmail(uuid, name, email);
    return;
}

async function postDocument(req: Request, res: Response) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const email = (fields.email as string[])?.[0];
        const token = (fields.token as string[])?.[0];
        const name = (fields.name as string[])?.[0];
        const uuid = (fields.uuid as UUID[])?.[0];

        if (!email || !token || !uuid || !name) {
            return res.status(400).send('Missing parameters');
        }

        let uploadedFile = files.file![0];

        if (!uploadedFile) {
            return res.status(400).send('Missing file');
        }

        const clientIp = (req.headers['x-forwarded-for'] as string) || (req.connection.remoteAddress as string);

        const data = await upoService.sendDoc({ file: uploadedFile, ip: clientIp, email: email, metadata: {} });
        const analysisId = data.requestID;
        console.log('file uploaded');
        if (!analysisId) {
            return res.status(500).send('Error sending the file. No response');
        }
        await dbService.updateRecord(uuid, { analysisId, name });
        waitAndNotify(uuid, name, analysisId, email);

        console.log('fields', email + token + name + uuid);

        return res.status(200).send('Record updated');
    });
}

const verifyCode = async (req: Request, res: Response) => {
    const { uuid, email, token } = req.body;
    const record = await dbService.getRecord({ id: uuid, email, token, verified: false });
    if (!record) {
        return res.status(404).send('Record not found');
    }
    if (record.token_expires_at < new Date()) {
        return res.status(400).send('Code expired');
    }
    await dbService.updateRecord(record.id, { verified: true });
    return res.status(200).send('Record verified');
};

const sendVerificationEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(req.body);

    if (!email) {
        return res.sendStatus(400);
    }
    try {
        const token = crypto.randomBytes(4).toString('hex').toUpperCase();
        const uuid = crypto.randomUUID();
        console.log(token);
        await dbService.createRecord({ id: uuid, email, token });
        mailerService.sendVerificationEmail(email, token);
        return res.status(200).send({ uuid: uuid });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const getResults = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).send('No id provided');
    try {
        const results = await dbService.getResults(id as UUID);
        return res.status(200).send(results);
    } catch (e) {
        return res.sendStatus(404);
    }
};

const downloadResultData = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).send('No id provided');
    try {
        const results = await dbService.getResults(id as UUID);
        return res.status(200).send(results);
    } catch (e) {
        return res.sendStatus(500);
    }
};

const checkAuthorization = async (req: Request, res: Response) => {
    const { email } = req.params;
    console.log(email);

    const allowed_emails = process.env.ALLOWED_EMAILS?.split(',');
    if (allowed_emails?.includes(email)) {
        return res.status(200).send('Authorized');
    }

    const record = await dbService.getPendingUserRecord(email);
    console.log(record);

    let now = new Date();
    if (record && record.token_expires_at > now) {
        return res.status(403).send('Unauthorized');
    }
    return res.status(200).send('Authorized');
};

const downloadCSVDocs = async (req: Request, res: Response) => {
    const { id } = req.params as { id: UUID };
    if (!id) return res.status(400).send('No id provided');
    try {
        const { analysis_id } = await dbService.getResults(id);
        const zip = await upoService.downloadCSVDocs(analysis_id);
        // Set response headers for file download
        res.setHeader('Content-Disposition', 'attachment; filename="data.zip"');
        res.setHeader('Content-Type', 'application/zip');
        // Stream the file to the client
        // Pipe the response stream directly to the client
        zip.pipe(res);
        // return res.status(200).send(results);
    } catch (e) {
        return res.sendStatus(500);
    }
};

const handlers = {
    sendVerificationEmail,
    verifyCode,
    postDocument,
    getResults,
    downloadResultData,
    checkAuthorization,
    downloadCSVDocs
};

export default handlers;
