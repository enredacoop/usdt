import { Router } from 'express';
import dbService from './services/db';
import handlers from './handlers';

const router = Router();

router.get('/records/:id', async (req, res) => {
    await handlers.getResults(req, res);
});

router.get('/records/:id/download', async (req, res) => {
    await handlers.downloadResultData(req, res);
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
router.get('/check-authorization/:email', async (req, res) => {
    await handlers.checkAuthorization(req, res);
});
router.get('/csv_files/:id', async (req, res) => {
    await handlers.downloadCSVDocs(req, res);
});

export default router;
