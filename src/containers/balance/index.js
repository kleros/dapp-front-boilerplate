import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { balanceActions } from '../../actions'

class Balance extends PureComponent {
  static propTypes = {
    loadingBalance: PropTypes.bool.isRequired,
    balance: PropTypes.number.isRequired,
    fetchBalance: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  render() {
    const { loadingBalance, balance } = this.props
    return (
      <div>
        <b>Hello CryptoWorld</b>
        <br />
        <br />
        {loadingBalance ? <b>loading...</b> : <b>You have {balance} ETH.</b>}
      </div>
    )
  }
}

export default connect(state => ({ balance: state.balance.balance }), {
  fetchBalance: balanceActions.fetchBalance
})(Balance)
