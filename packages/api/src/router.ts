import { Router } from 'express';
import dbService from './db';

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

export default router;
