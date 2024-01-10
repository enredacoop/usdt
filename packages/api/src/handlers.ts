import { Request, Response } from 'express';
import crypto from 'crypto';
import dbService from './services/db';
import { mailerService } from './services/mailer';

const postDocument = async (req: Request, res: Response) => {
    const { name, email, token, file } = req.body;
    console.log(req.body);

    if (!name || !email || !token || !file) {
        return res.sendStatus(400);
    }
    try {
        const verifiedRecord = await dbService.getVerifiedRecord({ email, token });
        if (!verifiedRecord) {
            return res.sendStatus(400);
        }
        await dbService.updateRecord(verifiedRecord.id, { name });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    return res.status(200).send('Record created');
};

const verifyCode = async (req: Request, res: Response) => {
    const { email, token } = req.body;
    const record = await dbService.getRecord({ email, token });
    if (!record) {
        return res.status(400).send('Invalid code');
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
