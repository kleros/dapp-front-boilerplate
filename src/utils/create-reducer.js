import { objMap } from './functional'
import { constantToCamelCase } from './strings'

const automaticActionPluginMap = {
  CREATE_: { creating: true, failedCreating: false },
  RECEIVE_CREATED_: { creating: false, failedCreating: false },
  FAIL_CREATE_: { creating: false, failedCreating: true },
  FETCH_: { loading: true, failedFetching: false },
  RECEIVE_: { loading: false, failedFetching: false },
  FAIL_FETCH_: { loading: false, failedFetching: true }
}

/**
 * Util that makes creating reducers easier.
 * @export default createReducer
 * @param {object} initialState - The initial state for the reducer.
 * @param {object} reducerMap - A map of action type string constants to functions that return a slice of state.
 * @returns {function} - A reducer function.
 */
export default function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    let newState =
      reducerMap && reducerMap[action.type]
        ? reducerMap[action.type](state, action)
        : state

    for (const actionTypePrefix of Object.keys(automaticActionPluginMap)) {
      const l = actionTypePrefix.length
      const a = action.type.slice(0, l)
      if (actionTypePrefix === a) {
        const resource = constantToCamelCase(action.type.slice(l), {
          capitalizeFirst: true
        })
        newState = {
          ...newState,
          ...objMap(
            automaticActionPluginMap[actionTypePrefix],
            value => value,
            { returnObj: true, transformKeyFunc: key => key + resource }
          )
        }
        break
      }
    }

    return newState
  }
}
