import { takeLatest, put } from 'redux-saga/effects'
import unit from 'ethjs-unit'
import { receiveAction, errorAction } from '../utils'
import { balanceActions } from '../actions'
import { eth } from '../bootstrap/kleros'

/**
 * Fetches ethereum balance.
 */
export function* fetchBalance() {
  try {
    const accounts = yield eth.accounts()
    const balance = yield eth.getBalance(accounts[0])
    unit.fromWei(balance, 'ether')

    yield put(receiveAction(balanceActions.RECEIVE_BALANCE, { balance }))
  } catch (err) {
    yield put(errorAction(balanceActions.FAIL_FETCH_BALANCE, err))
  }
}

/**
 * The root of the balance saga.
 * @export default balanceSaga
 */
export default function* balanceSaga() {
  yield takeLatest(balanceActions.FETCH_BALANCE, fetchBalance)
}
