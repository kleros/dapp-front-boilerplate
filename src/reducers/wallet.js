import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { walletActions } from '../actions'

// Reducer
export default createReducer(
  {
    loadingAccounts: false,
    accounts: null,
    failedFetchingAccounts: false,
    loadingBalance: false,
    balance: null,
    failedFetchingBalance: false
  },
  {
    [walletActions.RECEIVE_ACCOUNTS]: (state, action) => ({
      ...state,
      accounts: action.payload.accounts
    }),
    [walletActions.RECEIVE_BALANCE]: (state, action) => ({
      ...state,
      balance: action.payload.balance
    })
  }
)

// Selectors
export const getAccount = state =>
  state.wallet.accounts && state.wallet.accounts[0]
export const getBalance = state => state.wallet.balance

// Shapes
export const accountShape = PropTypes.string
export const balanceShape = PropTypes.shape({
  length: PropTypes.number.isRequired,
  negative: PropTypes.number.isRequired,
  red: PropTypes.bool,
  words: PropTypes.arrayOf(PropTypes.number).isRequired
})
