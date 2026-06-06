import express from 'express';
import { checkUrl, analyzeUrlAi, testAi } from '../controllers/scanController.js';

const router = express.Router();

router.post('/check-url', checkUrl);
router.post('/analyze-ai', analyzeUrlAi);
router.get('/test-ai', testAi);

export default router;
