import { Accessibility } from '@fluentui/accessibility'
import { useAccessibility } from '@fluentui/react-bindings'
import { shallow } from 'enzyme'
// @ts-ignore
import * as keyboardKey from 'keyboard-key'
import * as React from 'react'

type TestBehaviorProps = {
  disabled: boolean
}

const testBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
    },
    img: {
      'aria-label': 'Pixel',
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
})

const focusZoneBehavior: Accessibility<never> = () => ({
  focusZone: {
    props: {
      disabled: true,
      shouldFocusOnMount: true,
    },
  },
})

type TestComponentProps = {
  disabled?: boolean
  onClick?: (e: React.KeyboardEvent<HTMLDivElement>, slotName: string) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { disabled, onClick, onKeyDown, ...rest } = props
  const getA11Props = useAccessibility(testBehavior, {
    mapPropsToBehavior: () => ({
      disabled,
    }),
    actionHandlers: {
      click: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick) onClick(e, 'root')
      },
    },
  })

  return getA11Props.unstable_wrapWithFocusZone(
    <div {...getA11Props('root', { onKeyDown, ...rest })}>
      <img
        {...getA11Props('img', {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        })}
      />
    </div>,
  )
}

type FocusZoneComponentProps = {
  as?: React.ElementType
  rtl?: boolean
}

const FocusZoneComponent: React.FunctionComponent<FocusZoneComponentProps> = props => {
  const { as: ElementType = 'div', children, rtl = false } = props
  const getA11Props = useAccessibility(focusZoneBehavior, { rtl })

  return getA11Props.unstable_wrapWithFocusZone(
    <ElementType {...getA11Props('root', {})}>{children}</ElementType>,
  )
}

describe('useAccessibility', () => {
  it('sets attributes', () => {
    const wrapper = shallow(<TestComponent />)

    expect(wrapper.find('div').prop('tabIndex')).toBe(1)
    expect(wrapper.find('img').prop('role')).toBe('presentation')
  })

  it('attributes can be conditional', () => {
    expect(
      shallow(<TestComponent disabled />)
        .find('div')
        .prop('aria-disabled'),
    ).toBe(true)
    expect(
      shallow(<TestComponent disabled={false} />)
        .find('div')
        .prop('aria-disabled'),
    ).toBe(false)
  })

  it('attributes can be overridden', () => {
    expect(
      shallow(<TestComponent tabIndex={-1} />)
        .find('div')
        .prop('tabIndex'),
    ).toBe(-1)
  })

  it('adds event handlers', () => {
    const onKeyDown = jest.fn()
    const onClick = jest.fn()
    const wrapper = shallow(<TestComponent onClick={onClick} onKeyDown={onKeyDown} />)

    wrapper
      .find('div')
      .simulate('click')
      .simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
      })

    expect(onKeyDown).toBeCalledTimes(1)
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({
        keyCode: keyboardKey.ArrowDown,
      }),
    )

    expect(onClick).toBeCalledTimes(1)
    expect(onClick).toBeCalledWith(
      expect.objectContaining({
        keyCode: keyboardKey.ArrowDown,
      }),
      'root',
    )
  })

  describe('FocusZone', () => {
    it('do not render FocusZone without the definition in a behavior', () => {
      expect(shallow(<TestComponent />).find('FocusZone')).toHaveLength(0)
    })

    it('renders FocusZone with the definition in a behavior', () => {
      expect(shallow(<FocusZoneComponent />).find('FocusZone')).toHaveLength(1)
    })

    it('applies props from the behavior to a FocusZone component', () => {
      expect(
        shallow(<FocusZoneComponent />)
          .find('FocusZone')
          .props(),
      ).toEqual(
        expect.objectContaining({
          disabled: true,
          shouldFocusOnMount: true,
        }),
      )
    })

    it('passes "rtl" value', () => {
      expect(
        shallow(<FocusZoneComponent />)
          .find('FocusZone')
          .prop('isRtl'),
      ).toBe(false)
      expect(
        shallow(<FocusZoneComponent rtl />)
          .find('FocusZone')
          .prop('isRtl'),
      ).toBe(true)
    })
  })
})
