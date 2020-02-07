import { Accessibility, AriaRole } from '@fluentui/accessibility'
import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import { act } from 'react-dom/test-utils'

import { mountWithProviderAndGetComponent, mountWithProvider } from 'test/utils'
import { UIComponent } from 'src/utils'
import { EVENT_TARGET_ATTRIBUTE, getEventTargetComponent } from './eventTarget'

export const getRenderedAttribute = (renderedComponent, propName, partSelector) => {
  const target = partSelector
    ? renderedComponent.render().find(partSelector)
    : renderedComponent.render()

  return target.first().prop(propName)
}

const overriddenRootRole = 'test-mock-role' as AriaRole

const TestBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: overriddenRootRole,
    },
  },
})

/**
 * Assert Component handles accessibility attributes correctly.
 * @param Component - A component that should conform.
 */
export default (
  Component: React.ComponentType<any>,
  options: {
    /** Props required to render Component without errors or warnings */
    requiredProps?: { [key: string]: any }
    /** Default root role rendered when no override provided */
    defaultRootRole?: string
    /** Selector to scope the test to a part */
    partSelector?: string
    usesWrapperSlot?: boolean
  } = {},
) => {
  const {
    requiredProps = {},
    defaultRootRole,
    partSelector = '',
    usesWrapperSlot = false,
  } = options

  test('gets default accessibility when no override used', () => {
    const rendered = mountWithProviderAndGetComponent(Component, <Component {...requiredProps} />)
    const role = getRenderedAttribute(rendered, 'role', partSelector)
    expect(role).toBe(defaultRootRole)
  })

  test('does not get role when overrides to null', () => {
    const rendered = mountWithProviderAndGetComponent(
      Component,
      <Component {...requiredProps} accessibility={null} />,
    )
    const role = getRenderedAttribute(rendered, 'role', partSelector)
    expect(role).toBeFalsy()
  })

  if (!partSelector) {
    // temporarily disabled as we do not support overriding of attributes applied to parts
    test('gets correct role when overrides accessibility', () => {
      const testRole = 'test-mock-role'
      const element = usesWrapperSlot ? (
        <Component {...requiredProps} wrapper={{ role: testRole }} />
      ) : (
        <Component {...requiredProps} accessibility={TestBehavior} />
      )
      const rendered = mountWithProviderAndGetComponent(Component, element)
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(testRole)
    })

    test('gets correct role when overrides role', () => {
      const testRole = 'test-role'
      const element = usesWrapperSlot ? (
        <Component {...requiredProps} wrapper={{ role: testRole }} />
      ) : (
        <Component {...requiredProps} role={testRole} />
      )
      const rendered = mountWithProviderAndGetComponent(Component, element)
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(testRole)
    })

    test('gets correct role when overrides both accessibility and role', () => {
      const testRole = 'test-role'
      const element = usesWrapperSlot ? (
        <Component {...requiredProps} accessibility={TestBehavior} wrapper={{ role: testRole }} />
      ) : (
        <Component {...requiredProps} accessibility={TestBehavior} role={testRole} />
      )
      const rendered = mountWithProviderAndGetComponent(Component, element)
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(testRole)
    })

    test(`handles "onKeyDown" overrides`, () => {
      const actionHandler = jest.fn()
      const eventHandler = jest.fn()

      const actionBehavior: Accessibility = () => ({
        keyActions: {
          root: {
            mockAction: {
              keyCombinations: [{ keyCode: keyboardKey.Enter }],
            },
          },
        },
      })

      const wrapperProps = {
        ...requiredProps,
        accessibility: actionBehavior,
        [EVENT_TARGET_ATTRIBUTE]: true,
        onKeyDown: eventHandler,
      }

      const wrapper = mountWithProvider(<Component {...wrapperProps} />)
      const component = wrapper.find(Component)
      const instance = component.instance() as UIComponent<any, any>

      if (instance) {
        if (instance.actionHandlers) {
          instance.actionHandlers.mockAction = actionHandler
        }
        // Force render component to apply updated key handlers
        wrapper.setProps({})
      }

      act(() => {
        getEventTargetComponent(component, 'onKeyDown').simulate('keydown', {
          keyCode: keyboardKey.Enter,
        })
      })

      if (instance && instance.actionHandlers) {
        expect(actionHandler).toBeCalledTimes(1)
      }

      expect(eventHandler).toBeCalledTimes(1)
    })
  }
}
