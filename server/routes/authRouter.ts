import express from 'express'
import authController from '../controllers/authController'
import { validRegister } from '../middleware/valid'

const router = express.Router()

router.post('/register', validRegister, authController.register)
router.post('/active', authController.activeAccount)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/refresh_token', authController.refreshToken)
router.post('/google_login', authController.google_login)
router.post('/login_sms', authController.login_sms)
router.post('/sms_verify', authController.sms_verify)

export default router
