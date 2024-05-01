import express from 'express';
import { getAccount } from '../controllers/userController.js';

const router = express.Router();

router.route('/account').post(getAccount);

export default router;
