import { constantToCamelCase, camelToTitleCase, shorten } from './string'

const constant = 'HELLO_CRYPTO_WORLD'
const camelCase = 'helloCryptoWorld'
const capitalizeFirstCamelCase = 'HelloCryptoWorld'
const constantWith$ = '$HELLO$_WORLD'
const camelCaseWith$ = 'HELLOWorld'
const titleCase = 'Hello Crypto World'

describe('constantToCamelCase', () => {
  it('converts constant case strings to camel case.', () =>
    expect(constantToCamelCase(constant)).toBe(camelCase))
  it('converts constant case strings to camel case and capitalizes the first letter.', () =>
    expect(constantToCamelCase(constant, { capitalizeFirst: true })).toBe(
      capitalizeFirstCamelCase
    ))
  it('converts constant case strings to camel case and ignores chars between `$` chars.', () =>
    expect(constantToCamelCase(constantWith$)).toBe(camelCaseWith$))
})

describe('camelToTitleCase', () =>
  it('converts camel case strings to title case.', () =>
    expect(camelToTitleCase(camelCase)).toBe(titleCase)))

describe('shorten', () => {
  it('properly shortens a string with a middle cut', () => {
    expect(shorten(constant, 5)).toEqual('H...D')
    expect(shorten(constant, 6)).toEqual('HE...D')
    expect(shorten(constant, 7)).toEqual('HE...LD')
  })

  it('properly shortens a string with a right cut', () =>
    expect(shorten(constant, 5, { position: 'right' })).toEqual('HE...'))

  it("returns a string if the length is bigger than string's length", () =>
    expect(shorten(constant, 18)).toEqual(constant))

  it('returns prefix if length is smaller than 5', () =>
    expect(shorten(constant, 3)).toEqual('HEL'))

  it('returns prefix if unknown position is specified', () =>
    expect(shorten(constant, 5, { position: 'foo' })).toEqual('HELLO'))
})
