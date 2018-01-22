import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import balance, * as balanceSelectorsShapes from './balance'

// Export root reducer
export default combineReducers({
  router,
  form,
  balance
})

// Export shapes
export { balanceSelectorsShapes }
