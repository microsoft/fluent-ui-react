import { isForwardRefComponent, supportsRef } from 'src/lib/forwardRefFactory/componentUtils'
import { DOMClass, DOMFunction, ForwardedRef } from '../../components/Ref/fixtures'

describe('componentUtils', () => {
  test('isForwardRefComponent', () => {
    it('returns "false" when passed component do not support ref forwarding', () => {
       [DOMClass, DOMFunction, 'div'].map(Component => {
        expect(isForwardRefComponent(Component)).toBe(false)
      })
    })

    it('returns "true" when passed component supports ref forwarding', () => {
      expect(isForwardRefComponent(ForwardedRef)).toBe(false)
    })
  })

  describe('supportsRef', () => {
    it('returns "false" when passed component do not support "ref" prop', () => {
       [DOMClass, DOMFunction, 'div'].map(Component => {
        expect(supportsRef(Component)).toBe(false)
      })
    })

    it('returns "true" when passed component supports "ref" prop', () => {
       ['div', ForwardedRef].map(Component => {
        expect(supportsRef(Component)).toBe(true)
      })
    })
  })
})
