import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { eth } from './kleros'
import { RequiresMetaMask } from '../components'

class Initializer extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  state = {
    isWeb3Loaded: false,
    isWeb3Unlocked: false
  }

  async componentWillMount() {
    let accounts = []

    if (eth.accounts !== undefined) {
      this.setState({ isWeb3Loaded: true })
      accounts = await eth.accounts()
    }

    if (accounts.length !== 0) this.setState({ isWeb3Unlocked: true })
  }

  render() {
    const { isWeb3Loaded, isWeb3Unlocked } = this.state
    const { children } = this.props

    if (!isWeb3Loaded) return <RequiresMetaMask />
    if (!isWeb3Unlocked) return <RequiresMetaMask needsUnlock />
    return <div>{children}</div>
  }
}

export default Initializer
