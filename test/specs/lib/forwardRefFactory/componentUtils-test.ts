import { isForwardRefComponent, supportsRef } from 'src/lib/forwardRefFactory/componentUtils'
import { DOMClass, DOMFunction, ForwardedRef } from '../../components/Ref/fixtures'

describe('componentUtils', () => {
  test('isForwardRefComponent', () => {
    it('returns "false" when passed component do not support ref forwarding', () => {
      const components = [DOMClass, DOMFunction, 'div']

      components.forEach(component => {
        expect(isForwardRefComponent(component)).toBe(false)
      })
    })

    it('returns "true" when passed component supports ref forwarding', () => {
      expect(isForwardRefComponent(ForwardedRef)).toBe(false)
    })
  })

  describe('supportsRef', () => {
    it('returns "false" when passed component do not support "ref" prop', () => {
      const components = [DOMClass, DOMFunction, 'div']

      components.forEach(component => {
        expect(supportsRef(component)).toBe(false)
      })
    })

    it('returns "true" when passed component supports "ref" prop', () => {
      const components = ['div', ForwardedRef]

      components.forEach(component => {
        expect(supportsRef(component)).toBe(true)
      })
    })
  })
})
