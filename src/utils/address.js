import Web3 from 'web3'

/**
 * Checks if provided address is a valid Ethereum address.
 * @param {string} address - The address to be validated.
 * @returns {boolean} - Whether the address is a valid one.
 */
export const isValidAddress = address => new Web3().utils.isAddress(address)
