import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import { mountWithProvider as mount } from 'test/utils'

import Slot from 'src/components/Slot/Slot'
import { ReactProps, ShorthandValue } from 'utils'

export interface ImplementsWrapperPropOptions {
  wrapppedComponentSelector: any
  WrapperComponent?: any
}

type WrapperProps = {
  wrapper?: ShorthandValue
}

const implementsWrapperProp = (
  Component: React.ComponentType<ReactProps<WrapperProps>>,
  options: ImplementsWrapperPropOptions,
) => {
  const { wrapppedComponentSelector, WrapperComponent = Slot } = options

  const wrapperTests = (wrapper: ReactWrapper) => {
    expect(wrapper.length).toBeGreaterThan(0)
    expect(wrapper.find(wrapppedComponentSelector).length).toBeGreaterThan(0)
  }

  describe('"wrapper" prop', () => {
    it('wraps the component by default', () => {
      wrapperTests(mount(<Component />).find(WrapperComponent))
    })

    it('wraps the component with a custom element using "as" prop', () => {
      wrapperTests(mount(<Component wrapper={{ as: 'p' }} />).find('p'))
    })
  })
}

export default implementsWrapperProp
