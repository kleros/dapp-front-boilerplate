/**
 * Converts a string in constant case to camel case. e.g. HELLO_WORLD => helloWorld. It also ignores characters between $ chars. e.g. $HELLO$_WORLD => HELLOWorld.
 * @param {string} str - The string to convert.
 * @param {{ capitalizeFirst: boolean }} [options={ capitalizeFirst: false }] - An options object with sensible defaults.
 * @returns {string} - The converted string.
 */
export function constantToCamelCase(str, { capitalizeFirst = false } = {}) {
  const newStr = str
    .toLowerCase()
    .replace(/_./g, match => match[1].toUpperCase())

  return (capitalizeFirst
    ? newStr[0].toUpperCase() + newStr.slice(1)
    : newStr
  ).replace(/\$(.+?)\$/g, (_m, p1) => p1.toUpperCase())
}

/**
 * Converts a string in camel case to title case. e.g. helloWorld => Hello World.
 * @param {string} str - The string to convert.
 * @returns {string} - The converted string.
 */
export function camelToTitleCase(str) {
  return str.replace(
    /(^[a-z])|([a-z][A-Z])|([A-Z][a-z])/g,
    (_m, p1, p2, p3) =>
      p1 ? p1.toUpperCase() : p2 ? p2[0] + ' ' + p2[1] : ' ' + p3
  )
}

/**
 * Shortens a string to a given length, by default hiding the middle of it. e.g. 'Hello World!', 7 => 'He...d!'
 * @param {string} str - The string to shorten.
 * @param {number} length - The length to which text should be shortened.
 * @param {{position: string}} [options={position:middle}] - Object with an option determining which part of string should be removed during shortening.
 * @returns {string} - The shortened string.
 */
export function shorten(str, length, { position = 'middle' } = {}) {
  if (length >= str.length) return str
  if (length < 5) return str.substr(0, length)

  if (position === 'middle')
    return `${str.substr(0, Math.floor(length / 2) - 1)}...${str.substr(
      str.length - (Math.ceil(length / 2) - 2)
    )}`
  else if (position === 'right') return `${str.substr(0, length - 3)}...`
  else return str.substr(0, length)
}
