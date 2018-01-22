import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import wallet, * as walletSelectors from './wallet'

// Export root reducer
export default combineReducers({
  router,
  form,
  wallet
})

// Export shapes
export { walletSelectors }
