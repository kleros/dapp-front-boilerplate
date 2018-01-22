import Eth from 'ethjs'
import { Kleros } from 'kleros-api'

export const eth =
  window.web3 && window.web3.currentProvider
    ? new Eth(window.web3.currentProvider)
    : new Eth(
        new Eth.HttpProvider(
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_PROD_ETHEREUM_PROVIDER
            : process.env.REACT_APP_DEV_ETHEREUM_PROVIDER
        )
      )

export default new Kleros(eth.currentProvider, process.env.STORE_PROVIDER)
