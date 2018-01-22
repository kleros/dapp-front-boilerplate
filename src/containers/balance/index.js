import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { walletActions } from '../../actions'
import { walletSelectors } from '../../reducers'
import { renderIf } from '../../utils'
import { Identicon } from '../../components'
import './balance.css'

class Balance extends PureComponent {
  static propTypes = {
    loadingBalance: PropTypes.bool.isRequired,
    balance: walletSelectors.balanceShape,
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
            loading: 'Loading...',
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
    loadingBalance: state.wallet.loadingBalance,
    balance: walletSelectors.getBalance(state),
    failedFetchingBalance: state.wallet.failedFetchingBalance
  }),
  {
    fetchBalance: walletActions.fetchBalance
  }
)(Balance)
