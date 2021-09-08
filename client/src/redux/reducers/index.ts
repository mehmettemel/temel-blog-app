import { combineReducers } from 'redux'
import auth from './authReducer'
import notification from './notificationsReducer'
import categories from './categoryReducer'

export default combineReducers({
  auth,
  notification,
  categories,
})
