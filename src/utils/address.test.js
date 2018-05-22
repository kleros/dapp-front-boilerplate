import { isValidAddress } from './address'

describe('isValidAddress', () => {
  const validLowercase = '0xff8ececb5fd5cd70605dcfc037d9cc0d612e1479'
  const validUppercase = '0XFF8ECECB5FD5CD70605DCFC037D9CC0D612E1479'
  const validChecksummed = '0xff8ececB5fd5cd70605dCfc037d9CC0D612E1479'
  const invalidAddress1 = '0xff8ececb5fd5cd70605dcfc037d90d612e1479' // too short
  const invalidAddress2 = '0xff8ececb5fd5cd70605dcfc037d9cc0d612-1479' // invalid characters
  const invalidChecksummed = '0xFF8ececB5fd5cd70605dCfc037d9CC0D612E1479'

  it('validates correct addresses', () => {
    expect(isValidAddress(validLowercase)).toEqual(true)
    expect(isValidAddress(validUppercase)).toEqual(true)
  })

  it('validates correct checksummed address', () =>
    expect(isValidAddress(validChecksummed)).toEqual(true))

  it('reports invalid addresses', () => {
    expect(isValidAddress(invalidAddress1)).toEqual(false)
    expect(isValidAddress(invalidAddress2)).toEqual(false)
  })

  it('reports invalid checksummed addresses', () =>
    expect(isValidAddress(invalidChecksummed)).toEqual(false))
})
