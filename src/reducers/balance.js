import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { balanceActions } from '../actions'

// Reducer
export default createReducer(
  { loadingBalance: false, balance: null, failedFetchingBalance: false },
  {
    [balanceActions.RECEIVE_BALANCE]: (state, action) => ({
      ...state,
      balance: action.payload.balance
    })
  }
)

// Selectors

// Shapes
export const balanceShape = PropTypes.shape({
  length: PropTypes.number.isRequired,
  negative: PropTypes.number.isRequired,
  red: PropTypes.bool,
  words: PropTypes.arrayOf(PropTypes.number).isRequired
})
