import express from 'express'
import { loginUser, logoutUser, myDetails, registerUser } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { ProfileDetails } from '../controllers/profileController.js'

const router =express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/me',authMiddleware,myDetails)
router.get('/profile',authMiddleware,ProfileDetails)
export default router;