import { Dispatch } from 'react'
import { AUTH, IAuth, IAuthType } from '../types/authTypes'
import { GET_OTHER_INFO, IGetOtherInfoType } from '../types/profileTypes'
import { ALERT, IAlertType } from '../types/notificationsTypes'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { getAPI, patchAPI } from '../../utils/FetchData'
import { checkPassword } from '../../utils/Valid'
export const updateUser =
  (avatar: File, name: string, auth: IAuth) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return
    let url = ''
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      if (avatar) {
        const check = checkImage(avatar)
        if (check) return dispatch({ type: ALERT, payload: { errors: check } })

        const photo = await imageUpload(avatar)
        url = photo.url
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      })

      const res = await patchAPI(
        'user',
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      )

      dispatch({ type: ALERT, payload: { loading: false } })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const msg = checkPassword(password, cf_password)
      if (msg) return dispatch({ type: ALERT, payload: { errors: msg } })

      const res = await patchAPI('reset_password', { password }, token)

      dispatch({ type: ALERT, payload: { loading: false } })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
export const getOtherInfo = (id: string) => async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`user/${id}`)

    dispatch({
      type: GET_OTHER_INFO,
      payload: res.data,
    })

    dispatch({ type: ALERT, payload: {} })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}
