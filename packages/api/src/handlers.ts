import { Request, Response } from 'express';
import crypto from 'crypto';
import dbService from './services/db';
import { mailerService } from './services/mailer';
import formidable from 'formidable';

async function postDocument(req: Request, res: Response) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        Object.values(files).forEach((file) => {
            console.log('file uploaded');
        });

        const email = (fields.email as string[])?.[0];
        const token = (fields.token as string[])?.[0];
        const name = (fields.name as string[])?.[0];

        if (!email || !token) {
            return res.status(400).send('Missing parameters');
        }
        const record = await dbService.getRecord({ email, token, verified: true });
        if (!record) {
            return res.status(400).send('Invalid code or not verified');
        }
        await dbService.updateRecord(record.id, { name });

        return res.status(200).send('Record updated');
    });
}

const verifyCode = async (req: Request, res: Response) => {
    const { email, token } = req.body;
    const record = await dbService.getRecord({ email, token });
    if (!record) {
        return res.status(404).send('Record not found');
    }
    if (record.verified) {
        return res.status(400).send('Record already verified');
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
        await dbService.createRecord({ email, token });
        mailerService.sendVerificationEmail(email, token);
        return res.status(200).send('Email sent');
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const handlers = { sendVerificationEmail, verifyCode, postDocument };

export default handlers;
