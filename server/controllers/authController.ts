import { Request, Response } from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateActiveToken, generateRefreshToken } from '../config/generateToken'
import { validateEmail, validPhone } from '../middleware/valid'
import sendEmail from '../config/sendMail'
import { sendSms, smsOTP, smsVerify } from '../config/sendSMS'
import { IDecodedToken, IUser, IGgPayload, IUserParams } from '../config/interface'
import { OAuth2Client } from 'google-auth-library'
const CLIENT_URL = `${process.env.BASE_URL}`
const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await Users.findOne({ account })
      if (user) return res.status(400).json({ msg: 'Email or Phone number is already exists' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = {
        name,
        account,
        password: passwordHash,
      }

      const active_token = generateActiveToken({ newUser })
      const url = `${CLIENT_URL}/active/${active_token}`

      if (validateEmail(account)) {
        sendEmail(account, url, 'Verify your email address')
        return res.json({
          msg: 'Success.Please check your email',
        })
      } else if (validPhone(account)) {
        sendSms(account, url, 'Verify your phone number')
        return res.json({
          msg: 'Success.Please check your your phone',
        })
      }
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body

      const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

      const { newUser } = decoded

      if (!newUser) return res.status(400).json({ msg: 'Invalid authentication.' })
      const user = await Users.findOne({ account: newUser.account })
      if (user) return res.status(400).json({ msg: 'Account already exists.' })
      const new_user = new Users(newUser)

      await new_user.save()

      res.json({ msg: 'Account has been activated!' })
    } catch (err: any) {
      return res.status(500).json({ msg: err })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body

      const user = await Users.findOne({ account })
      if (!user) return res.status(400).json({ msg: 'This account does not exits.' })

      // if user exists
      loginUser(user, password, res)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: `/api/refresh_token` })
      return res.json({ msg: 'Logged out!' })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken
      if (!rf_token) return res.status(400).json({ msg: 'Please login now!' })

      const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id) return res.status(400).json({ msg: 'Please login now!' })

      const user = await Users.findById(decoded.id).select('-password')
      if (!user) return res.status(400).json({ msg: 'This account does not exists' })

      const access_token = generateAccessToken({ id: user._id })

      res.json({ access_token, user })
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  google_login: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body

      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      })
      const { email, email_verified, name, picture } = <IGgPayload>verify.getPayload()

      if (!email_verified) return res.status(500).json({ msg: 'Email verification failed' })

      const password = email + 'PN4KliiDMGp52hvrZOLxI_qT'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await Users.findOne({ account: email })
      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture,
          type: 'google',
        }
        registerUser(user, res)
      }
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  login_sms: async (req: Request, res: Response) => {
    try {
      const { phone } = req.body
      const data = await smsOTP(phone, 'sms')
      res.json(data)
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
  sms_verify: async (req: Request, res: Response) => {
    try {
      const { phone, code } = req.body
      const data = await smsVerify(phone, code)
      if (!data?.valid) return res.status(400).json({ msg: 'Invalid Auth' })

      const password = phone + '32313dsadsa32ööx.llds'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await Users.findOne({ account: phone })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name: phone,
          account: phone,
          password: passwordHash,
          type: 'sms',
        }
        registerUser(user, res)
      }
    } catch (err) {
      return res.status(500).json({ msg: err })
    }
  },
}

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    let msgError =
      user.type === 'register'
        ? 'Password is incorrect'
        : `Password is incorrect.This account login with ${user.type}`
    return res.status(400).json({ msg: msgError })
  }

  const access_token = generateAccessToken({ id: user._id })
  const refresh_token = generateRefreshToken({ id: user._id })

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  })

  res.json({
    msg: 'Login Success!',
    access_token,
    user: { ...user._doc, password: '' },
  })
}
const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user)
  await newUser.save()

  const access_token = generateAccessToken({ id: newUser._id })
  const refresh_token = generateRefreshToken({ id: newUser._id })

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  })

  res.json({
    msg: 'Login Success!',
    access_token,
    user: { ...newUser._doc, password: '' },
  })
}

export default authController
