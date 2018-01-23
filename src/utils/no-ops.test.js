import { noOp, renderNull } from './no-ops'

describe('noOp', () =>
  it('does nothing.', () => expect(noOp()).toBe(undefined)))

describe('renderNull', () =>
  it('returns null.', () => expect(renderNull()).toBe(null)))
