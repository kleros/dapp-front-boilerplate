import { makeCancellable } from './sagas'
import { call, race } from 'redux-saga/effects'

describe('makeCancellable', () =>
  it('races a cancel action against a saga call.', () => {
    const saga = function*() {}
    const cancelAction = { type: 'CANCEL' }
    const gen = makeCancellable(saga, cancelAction)

    expect(gen.next().value).toEqual(
      race({
        task: call(saga, cancelAction),
        cancel: 'CANCEL_' + cancelAction.type
      })
    )
    expect(gen.next().done).toBe(true)
  }))
