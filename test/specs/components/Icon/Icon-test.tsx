import * as React from 'react'
import { isConformant, handlesAccessibility } from '../../commonTests'

import Icon from '../../../../src/components/Icon/Icon'
import { MenuBehavior } from 'src/lib/accessibility'
import { getTestingRenderedComponent } from 'test/utils'

const getProp = (renderedComponent, propName, partSelector) => {
  const target = partSelector
    ? renderedComponent.render().find(partSelector)
    : renderedComponent.render()

  return target.first().prop(propName)
}

describe('Icon', () => {
  isConformant(Icon)

  describe('Icon accessibility', () => {
    handlesAccessibility(Icon, {
      defaultRootRole: undefined,
      accessibilityOverride: MenuBehavior,
      overridenRootRole: 'menu',
    })
  })

  describe('Icon accessibility - aria hidden', () => {
    test('set to true by default', () => {
      const renderedComponent = getTestingRenderedComponent(Icon, <Icon />)
      const ariaHiddenAttr = getProp(renderedComponent, 'aria-hidden', '')
      expect(ariaHiddenAttr).toBe('true')
    })
  })
})
