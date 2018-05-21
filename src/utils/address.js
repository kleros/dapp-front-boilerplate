export const validAddress = address => {
  if (/^(0x)?[0-9a-fA-F]{40}$/i.test(address))
    // check if address consists of '0x' and 40 hexadecimal characters
    return true
  return false
}
