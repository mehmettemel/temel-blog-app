import { ALERT, IAlertType } from '../types/notificationsTypes'
import { IAlert } from '../../utils/Typescript'

const notificationReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload
    default:
      return state
  }
}

export default notificationReducer
