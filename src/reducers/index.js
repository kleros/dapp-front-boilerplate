import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import balance from './balance'

export default combineReducers({
  router,
  form,
  balance
})
