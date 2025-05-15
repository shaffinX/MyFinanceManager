import express from 'express';
import {Login,Register,checkMe} from './Controller/authController.js';
import errorHandler from './Middleware/errorMiddleware.js';
const router = express.Router();
router.use('/',errorHandler);
router.post('/login',Login);
router.post('/register',Register);
router.post('/checkme',checkMe);

export default router;