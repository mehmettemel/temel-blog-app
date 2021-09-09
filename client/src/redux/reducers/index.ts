import { combineReducers } from 'redux'
import auth from './authReducer'
import notification from './notificationsReducer'
import categories from './categoryReducer'
import blogs from './blogsReducer'
import blogsByCategory from './blogsByCategoryReducer'

export default combineReducers({
  auth,
  notification,
  categories,
  blogs,
  blogsByCategory,
})
