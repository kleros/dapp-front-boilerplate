import Eth from 'ethjs'
import { Kleros } from 'kleros-api'

let eth
if (process.env.NODE_ENV === 'test')
  eth = new Eth(require('ethereumjs-testrpc').provider())
else if (window.web3 && window.web3.currentProvider)
  eth = new Eth(window.web3.currentProvider)
else
  eth = new Eth.HttpProvider(
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_ETHEREUM_PROVIDER
      : process.env.REACT_APP_DEV_ETHEREUM_PROVIDER
  )

const kleros = new Kleros(eth.currentProvider, process.env.STORE_PROVIDER)

export { eth, kleros }
