import * as React from 'react'

import { mountWithProviderAndGetComponent } from 'test/utils'
import { defaultBehavior } from 'src/lib/accessibility'
import { Accessibility, AriaRole, FocusZoneMode } from 'src/lib/accessibility/types'
import { FocusZone } from 'src/lib/accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from 'src/lib/accessibility/FocusZone/focusUtilities'

export const getRenderedAttribute = (renderedComponent, propName, partSelector) => {
  const target = partSelector
    ? renderedComponent.render().find(partSelector)
    : renderedComponent.render()

  let node = target.first()
  if (node.attr(FOCUSZONE_WRAP_ATTRIBUTE)) {
    node = node.children().first() // traverse through FocusZone wrap <div>
  }
  return node.prop(propName)
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
 * @param {React.Component|Function} Component A component that should conform.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render Component without errors or warnings.
 * @param {string} [options.defaultRootRole=''] Default root role rendered when no override provided
 * @param {string} [options.partSelector=''] Selector to scope the test to a part
 * @param {FocusZoneDefinition} [options.focusZoneDefinition={}] FocusZone definition
 */
export default (
  Component,
  options: {
    requiredProps?: any
    defaultRootRole?: string
    partSelector?: string
    focusZoneDefinition?: any
    usesWrapperSlot?: boolean
  } = {},
) => {
  const {
    requiredProps = {},
    defaultRootRole,
    partSelector = '',
    focusZoneDefinition = {},
    usesWrapperSlot = false,
  } = options

  test('gets default accessibility when no override used', () => {
    const rendered = mountWithProviderAndGetComponent(Component, <Component {...requiredProps} />)
    const role = getRenderedAttribute(rendered, 'role', partSelector)
    expect(role).toBe(defaultRootRole)
  })

  test('does not get role when overrides to default', () => {
    const rendered = mountWithProviderAndGetComponent(
      Component,
      <Component {...requiredProps} accessibility={defaultBehavior} />,
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
  }

  if (focusZoneDefinition) {
    if (focusZoneDefinition.mode === FocusZoneMode.Wrap) {
      test('gets wrapped in FocusZone', () => {
        const rendered = mountWithProviderAndGetComponent(
          Component,
          <Component {...requiredProps} />,
        )

        const focusZone = rendered.childAt(0).childAt(0) // skip thru FelaTheme
        expect(focusZone.type()).toEqual(FocusZone)

        const focusZoneDiv = focusZone.childAt(0)
        expect(focusZoneDiv.type()).toBe('div')
        expect(focusZoneDiv.children().length).toBeGreaterThan(0)
      })
    } else if (focusZoneDefinition.mode === FocusZoneMode.Embed) {
      test('gets embedded with FocusZone', () => {
        const rendered = mountWithProviderAndGetComponent(
          Component,
          <Component {...requiredProps} />,
        )

        const focusZone = rendered.childAt(0).childAt(0) // skip thru FelaTheme
        expect(focusZone.type()).toEqual(FocusZone)
      })
    }
  }
}
