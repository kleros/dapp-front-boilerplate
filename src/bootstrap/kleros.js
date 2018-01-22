import Eth from 'ethjs'
import { Kleros } from 'kleros-api'
import { errorConstants } from '../constants'

export const eth =
  window.web3 && window.web3.currentProvider
    ? new Eth(window.web3.currentProvider)
    : new Eth(
        new Eth.providers.HttpProvider(
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_ETHEREUM_PROVIDER
            : process.env.DEV_ETHEREUM_PROVIDER
        )
      )
if (!eth.currentProvider) {
  throw new Error(errorConstants.WEB3_NOT_RESOLVED)
}

export default new Kleros(eth.currentProvider, process.env.STORE_PROVIDER)
