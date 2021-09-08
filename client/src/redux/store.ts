import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
