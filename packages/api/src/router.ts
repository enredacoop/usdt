import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/docs', (req, res) => {
    res.send('Yeah, docs!');
});

export default router;
