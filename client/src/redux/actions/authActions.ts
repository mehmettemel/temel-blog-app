import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authTypes'
import { ALERT, IAlertType } from '../types/notificationsTypes'
import { IUserLogin, IUserRegister } from '../../utils/Typescript'
import { getAPI, postAPI } from '../../utils/FetchData'
import { validPhone, validRegister } from '../../utils/Valid'

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('login', userLogin)

    //send data to user state
    dispatch({
      type: AUTH,
      payload: res.data,
    })

    dispatch({ type: ALERT, payload: { success: 'Login Success!' } })

    //save user to local storage
    localStorage.setItem('logged', 'temel-blog')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const register =
  (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)

    if (check.errLength > 0)
      return dispatch({
        type: ALERT,
        payload: { errors: check.errMsg },
      })
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI(`register`, userRegister)
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const refreshToken = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged')
  if (logged !== 'temel-blog') return
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`refresh_token`)
    dispatch({ type: AUTH, payload: res.data })
    dispatch({ type: ALERT, payload: {} })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const logout = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    localStorage.removeItem('logged')
    dispatch({ type: AUTH, payload: {} })
    await getAPI('logout')
    window.location.href = '/'
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const googleLogin = (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('google_login', { id_token })

    //send data to user state
    dispatch({
      type: AUTH,
      payload: res.data,
    })

    dispatch({ type: ALERT, payload: { success: 'Login Success!' } })

    //save user to local storage
    localStorage.setItem('logged', 'temel-blog')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const loginSMS = (phone: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validPhone(phone)
  if (!check) return dispatch({ type: ALERT, payload: { errors: 'Phone number format is incorrect' } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('login_sms', { phone })

    if (!res.data.valid) verifySMS(phone, dispatch)

    //send data to user state
    dispatch({
      type: AUTH,
      payload: res.data,
    })

    dispatch({ type: ALERT, payload: { success: 'Login Success!' } })

    //save user to local storage
    localStorage.setItem('logged', 'temel-blog')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const verifySMS = async (phone: string, dispatch: Dispatch<IAuthType | IAlertType>) => {
  const code = prompt('Enter your code')
  if (!code) return

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('sms_verify', { phone, code })

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'temel-blog')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    setTimeout(() => {
      verifySMS(phone, dispatch)
    }, 100)
  }
}
