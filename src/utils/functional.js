/**
 * Maps object into an array or a new object and optionally transforms keys.
 * @export
 * @param {object} obj - The obj to map over.
 * @param {object} func - The function to call with (value, key).
 * @param {object} { returnObj = false, transformKeyFunc } = {} - Options object.
 * @returns {array|object} - An array with the results of calling func on every property of obj.
 */
export function objMap(
  obj,
  func,
  { returnObj = false, transformKeyFunc } = {}
) {
  const keys = Object.keys(obj)
  const keysLen = keys.length
  const result = returnObj ? {} : []

  for (let i = 0; i < keysLen; i++) {
    const res = func(obj[keys[i]], keys[i])
    if (returnObj)
      result[transformKeyFunc ? transformKeyFunc(keys[i]) : keys[i]] = res
    else result.push(res)
  }

  return result
}

/**
 * Implements common rendering logic for loading and failures.
 * @export
 * @param {array} loadingValues - Array of booleans that indicate loading.
 * @param {array} values - Array of values.
 * @param {array} failedValues - Array of booleans that indicate failure.
 * @param {object} { loading, done, failed } - Renderables to render depending on conditions.
 * @returns {any} - A react renderable.
 */
export function renderIf(
  loadingValues,
  values,
  failedValues,
  { loading, done, failed }
) {
  if (
    failedValues.some(v => v) ||
    !values.every(v => v !== null && v !== undefined)
  )
    return failed
  if (loadingValues.some(v => v)) return loading

  return done
}
