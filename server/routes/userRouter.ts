import express from 'express'
import authController from '../controllers/authController'
import userController from '../controllers/userController'
import { auth } from '../middleware/auth'
import { validRegister } from '../middleware/valid'

const router = express.Router()

router.patch('/user', auth, userController.updateUser)
router.patch('/reset_password', auth, userController.resetPassword)
router.get('/user/:id', userController.getUser)

export default router
