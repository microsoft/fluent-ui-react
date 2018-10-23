import * as React from 'react'
import { mount } from 'enzyme'

import PortalInner, { PortalInnerProps } from 'src/components/Portal/PortalInner'

const mountPortalInner = (props: PortalInnerProps) =>
  mount(
    <PortalInner {...props}>
      <p />
    </PortalInner>,
  )

describe('PortalInner', () => {
  describe('render', () => {
    it('calls react createPortal', () => {
      const context = document.createElement('div')
      const comp = mountPortalInner({ context })

      expect(context.contains(comp.getDOMNode())).toBeTruthy()
    })
  })

  describe('onMount', () => {
    it('called when mounting', () => {
      const handlerSpy = jest.fn()
      mountPortalInner({ onMount: handlerSpy })

      expect(handlerSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('onUnmount', () => {
    it('is called only once when unmounting', () => {
      const handlerSpy = jest.fn()
      const wrapper = mountPortalInner({ onUnmount: handlerSpy })
      wrapper.unmount()

      expect(handlerSpy).toHaveBeenCalledTimes(1)
    })
  })
})
