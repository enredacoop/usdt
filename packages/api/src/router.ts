import { Router } from 'express';
import dbService from './services/db';
import handlers from './handlers';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/docs', (req, res) => {
    res.send('Yeah, docs!');
});

router.get('/records', async (req, res) => {
    await dbService.getRecords().then((records) => {
        res.send(records);
    });
});

router.post('/send', async (req, res) => {
    await handlers.sendVerificationEmail(req, res);
});

router.post('/verify', async (req, res) => {
    await handlers.verifyCode(req, res);
});

router.post('/doc', async (req, res) => {
    await handlers.postDocument(req, res);
});

export default router;
