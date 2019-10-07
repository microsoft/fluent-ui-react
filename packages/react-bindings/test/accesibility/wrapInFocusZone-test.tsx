import { FocusZoneMode } from '@stardust-ui/accessibility'
import {
  FocusZone,
  FOCUSZONE_WRAP_ATTRIBUTE,
  ReactAccessibilityBehavior,
  unstable_wrapInFocusZone as wrapInFocusZone,
} from '@stardust-ui/react-bindings'
import { mount } from 'enzyme'
import * as React from 'react'

const embedDefinition: ReactAccessibilityBehavior = {
  attributes: {},
  keyActions: {},
  keyHandlers: {},
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
    },
  },
}
const wrapDefinition: ReactAccessibilityBehavior = {
  attributes: {},
  keyActions: {},
  keyHandlers: {},
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
}

const TestComponent: React.FC<
  { as?: React.ElementType } & React.HTMLAttributes<HTMLDivElement>
> = props => {
  return React.createElement(props.as as React.ElementType)
}
TestComponent.defaultProps = {
  as: 'div',
}

describe('wrapInFocusZone', () => {
  describe('embed', () => {
    it('embeds passed element', () => {
      const wrapper = mount(wrapInFocusZone(<TestComponent tabIndex={0} />, embedDefinition, false))

      expect(wrapper.type()).toBe(FocusZone)

      expect(wrapper.prop('as')).toBe(TestComponent)
      expect(wrapper.childAt(0).prop('as')).toBe('div')

      expect(wrapper.prop(FOCUSZONE_WRAP_ATTRIBUTE)).toBeUndefined()
      expect(wrapper.prop('isCircularNavigation')).toBe(true)
      expect(wrapper.prop('isRtl')).toBe(false)
    })

    it('handles "as" prop', () => {
      const wrapper = mount(wrapInFocusZone(<TestComponent as="ul" />, embedDefinition, false))

      expect(wrapper.prop('as')).toBe(TestComponent)
      expect(wrapper.childAt(0).prop('as')).toBe('ul')
    })
  })

  describe('wrap', () => {
    it('wraps passed element', () => {
      const wrapper = mount(wrapInFocusZone(<div tabIndex={0} />, wrapDefinition, false))

      expect(wrapper.type()).toBe(FocusZone)
      expect(wrapper.prop(FOCUSZONE_WRAP_ATTRIBUTE)).toBe(true)
      expect(wrapper.prop('isCircularNavigation')).toBe(true)
      expect(wrapper.prop('isRtl')).toBe(false)

      expect(
        wrapper
          .childAt(0)
          .childAt(0)
          .type(),
      ).toBe('div')
      expect(
        wrapper
          .childAt(0)
          .childAt(0)
          .prop('tabIndex'),
      ).toBe(0)
    })
  })
  it('works in "embed" mode', () => {
    // return React.createElement(FocusZone, {
    //   ...element.props,
    //   ...accessibility.focusZone.props,
    //   as: element.type,
    //   isRtl: rtl,
    // })
  })
})
