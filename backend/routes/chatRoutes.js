import express from 'express'
import { createConversation, getConversation, getMessage, sendMessage } from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/conversation',authMiddleware,createConversation)
router.get('/conversations',authMiddleware,getConversation)
router.post ('/message',authMiddleware,sendMessage)
router.get('/message/:id',authMiddleware,getMessage)

export default router;