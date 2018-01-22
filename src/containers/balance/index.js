import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { balanceActions } from '../../actions'

class Balance extends PureComponent {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    fetchBalance: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  render() {
    const { balance } = this.props
    return (
      <div>{balance ? <b>You have {balance} ETH.</b> : <b>loading...</b>}</div>
    )
  }
}

export default connect(state => ({ balance: state.balance.balance }), {
  fetchBalance: balanceActions.fetchBalance
})(Balance)
