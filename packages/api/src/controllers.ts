import { Request, Response } from 'express';
import dbService from './db';
import { mailerService } from './mailer';
import crypto from 'crypto';

const postDocument = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const token = crypto.randomBytes(16).toString('hex');
    await dbService.createUser(name, email, token);
    await mailerService.sendVerificationEmail(req.body.email, token);
    return;
};

export default postDocument;
