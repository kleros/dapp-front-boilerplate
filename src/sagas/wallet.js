import { takeLatest, call, put, select } from 'redux-saga/effects'
import unit from 'ethjs-unit'
import { receiveAction, errorAction } from '../utils'
import { walletActions } from '../actions'
import { walletSelectors } from '../reducers'
import { eth } from '../bootstrap/kleros'

/**
 * Fetches the current wallet's accounts.
 */
export function* fetchAccounts() {
  try {
    const accounts = yield call(eth.accounts)
    if (!accounts[0]) throw new Error('No accounts.')

    yield put(receiveAction(walletActions.RECEIVE_ACCOUNTS, { accounts }))
  } catch (err) {
    yield put(errorAction(walletActions.FAIL_FETCH_ACCOUNTS, err))
  }
}

/**
 * Fetches the current wallet's ethereum balance.
 */
export function* fetchBalance() {
  try {
    const account = yield select(walletSelectors.getAccount)
    const balance = yield call(eth.getBalance, account)
    unit.fromWei(balance, 'ether')

    yield put(receiveAction(walletActions.RECEIVE_BALANCE, { balance }))
  } catch (err) {
    yield put(errorAction(walletActions.FAIL_FETCH_BALANCE, err))
  }
}

/**
 * The root of the wallet saga.
 * @export default walletSaga
 */
export default function* walletSaga() {
  yield takeLatest(walletActions.FETCH_ACCOUNTS, fetchAccounts)
  yield takeLatest(walletActions.FETCH_BALANCE, fetchBalance)
}
