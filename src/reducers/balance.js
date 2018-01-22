import { createReducer } from '../utils'
import { balanceActions } from '../actions'

// Reducer
export default createReducer(
  { loadingBalance: false, balance: 0 },
  {
    [balanceActions.RECEIVE_BALANCE]: (state, action) => ({
      ...state,
      balance: action.payload.balance
    })
  }
)

// Selectors

// Shapes
