import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { walletActions } from '../actions'
import { walletSelectors } from '../reducers'
import { eth } from './kleros'
import { renderIf } from '../utils'
import { RequiresMetaMask } from '../components'

class Initializer extends PureComponent {
  static propTypes = {
    loadingAccounts: PropTypes.bool.isRequired,
    account: walletSelectors.accountShape,
    failedFetchingAccounts: PropTypes.bool.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  }

  static defaultProps = {
    account: null
  }

  state = { isWeb3Loaded: eth.accounts !== undefined }

  componentDidMount() {
    const { fetchAccounts } = this.props
    fetchAccounts()
  }

  render() {
    const { isWeb3Loaded } = this.state
    const {
      children,
      loadingAccounts,
      account,
      failedFetchingAccounts
    } = this.props

    return renderIf(
      [loadingAccounts],
      [account],
      [!isWeb3Loaded, failedFetchingAccounts],
      {
        loading: 'Loading accounts...',
        done: children,
        failed: <RequiresMetaMask needsUnlock={isWeb3Loaded} />
      }
    )
  }
}

export default connect(
  state => ({
    loadingAccounts: state.wallet.loadingAccounts,
    account: walletSelectors.getAccount(state),
    failedFetchingAccounts: state.wallet.failedFetchingAccounts
  }),
  { fetchAccounts: walletActions.fetchAccounts }
)(Initializer)
