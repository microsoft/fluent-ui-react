import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import Slot from 'src/components/Slot'
import Segment from 'src/components/Segment'
import { ShorthandValue } from 'utils'

export interface ImplementsWrapperPropOptions {
  wrapppedComponentSelector: any
  wrappperComponentSelector?: any
}

const implementsWrapperProp = <P extends { wrapper: ShorthandValue }>(
  Component: React.ReactType<P>,
  options: ImplementsWrapperPropOptions,
) => {
  const { wrapppedComponentSelector, wrappperComponentSelector = Slot.defaultProps.as } = options

  const wrapperTests = (wrapper: ReactWrapper) => {
    expect(wrapper.length).toBeGreaterThan(0)
    expect(wrapper.find(wrapppedComponentSelector).length).toBeGreaterThan(0)
  }

  describe('"wrapper" prop', () => {
    it('does not wrap the component when set to false', () => {
      const wrapper = mount(<Component wrapper={false} />).find(wrappperComponentSelector)

      expect(wrapper.length).toEqual(0)
    })

    it('wraps the component by default', () => {
      wrapperTests(mount(<Component />).find(wrappperComponentSelector))
    })

    it('wraps the component with a custom element', () => {
      wrapperTests(mount(<Component wrapper={<span />} />).find('span'))
    })

    it('wraps the component with a custom element using "as" prop', () => {
      const customElem = 'p'
      wrapperTests(mount(<Component wrapper={{ as: customElem }} />).find(customElem))
    })

    it('wraps the component with another stardust component as wrapper', () => {
      wrapperTests(mount(<Component wrapper={<Segment />} />).find(Segment))
    })

    it('wraps the component with a custom component as wrapper', () => {
      class MyComponent extends React.Component {
        render() {
          return <div>{this.props.children}</div>
        }
      }

      wrapperTests(mount(<Component wrapper={<MyComponent />} />).find(MyComponent))
    })
  })
}

export default implementsWrapperProp
