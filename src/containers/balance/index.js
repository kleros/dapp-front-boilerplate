import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { balanceActions } from '../../actions'
import { balanceSelectorsShapes } from '../../reducers'
import { renderIf } from '../../utils'
import { Identicon } from '../../components'
import './balance.css'

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
      <div className="Balance">
        <div className="Balance-message">
          <b>Hello CryptoWorld</b>
        </div>
        <br />
        <br />
        <div className="Balance-message">
          {renderIf([loadingBalance], [balance], [failedFetchingBalance], {
            loading: 'loading...',
            done: (
              <span>
                Welcome <Identicon seed="Placeholder" />, You have{' '}
                {balance && balance.toString()} ETH.
              </span>
            ),
            failed: (
              <span>
                'There was an error fetching your balance. Make sure{' '}
                <a
                  className="Balance-message-link"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>{' '}
                is unlocked and refresh the page.'
              </span>
            )
          })}
        </div>
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
