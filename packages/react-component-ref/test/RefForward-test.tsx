import { RefForward } from '@stardust-ui/react-component-ref'
import { mount } from 'enzyme'
import * as React from 'react'

import { ForwardedRef } from './fixtures'

describe('RefForward', () => {
  describe('innerRef', () => {
    it('works with "forwardRef" API', () => {
      const forwardedRef = React.createRef<HTMLButtonElement>()
      const innerRef = React.createRef()

      mount(
        <RefForward innerRef={innerRef}>{<ForwardedRef ref={forwardedRef} /> as any}</RefForward>,
      )

      expect(forwardedRef.current).toBeInstanceOf(Element)
      expect(innerRef.current).toBeInstanceOf(Element)
    })
  })
})
