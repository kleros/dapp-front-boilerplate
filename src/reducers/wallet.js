import PropTypes from 'prop-types'
import { createReducer, createShape } from '../utils'

// Reducer
export default createReducer({
  accounts: {
    loading: false,
    data: null,
    failedLoading: false
  },
  balance: {
    loading: false,
    data: null,
    failedLoading: false
  }
})

// Selectors
export const getAccount = state =>
  state.wallet.accounts.data && state.wallet.accounts.data[0]

// Shapes
export const accountsShape = createShape(PropTypes.arrayOf(PropTypes.string))
export const balanceShape = createShape(
  PropTypes.shape({
    length: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
    red: PropTypes.bool,
    words: PropTypes.arrayOf(PropTypes.number).isRequired
  })
)
