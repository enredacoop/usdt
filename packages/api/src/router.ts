import { Router } from 'express';
import dbService from './db';
import { mailerService } from './mailer';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/docs', (req, res) => {
    res.send('Yeah, docs!');
});

router.get('/users', async (req, res) => {
    await dbService.getUsers().then((users) => {
        res.send(users);
    });
});

router.post('/doc', async (req, res) => {});

export default router;
