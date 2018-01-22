import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { balanceActions } from '../../actions'
import { balanceSelectorsShapes } from '../../reducers'
import { renderIf } from '../../utils'

class Balance extends PureComponent {
  static propTypes = {
    loadingBalance: PropTypes.bool.isRequired,
    balance: balanceSelectorsShapes.balanceShape,
    failedFetchingBalance: PropTypes.bool.isRequired,
    fetchBalance: PropTypes.func.isRequired
  }

  static defaultProps = {
    balance: null
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  render() {
    const { loadingBalance, balance, failedFetchingBalance } = this.props

    return (
      <div>
        <b>Hello CryptoWorld</b>
        <br />
        <br />
        <b>
          {renderIf([loadingBalance], [balance], [failedFetchingBalance], {
            loading: 'loading...',
            done: `You have ${balance} ETH.`,
            failed:
              'There was an error fetching your balance. Make sure MetaMask is unlocked and refresh the page.'
          })}
        </b>
      </div>
    )
  }
}

export default connect(
  state => ({
    loadingBalance: state.balance.loadingBalance,
    balance: state.balance.balance,
    failedFetchingBalance: state.balance.failedFetchingBalance
  }),
  {
    fetchBalance: balanceActions.fetchBalance
  }
)(Balance)
