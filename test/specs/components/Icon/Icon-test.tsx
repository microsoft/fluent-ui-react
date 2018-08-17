import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'

import Icon from '../../../../src/components/Icon/Icon'
import { MenuBehavior } from 'src/lib/accessibility'
import { getTestingRenderedComponent } from 'test/utils'

describe('Icon', () => {
  isConformant(Icon)

  describe('Icon accessibility', () => {
    handlesAccessibility(Icon, {
      defaultRootRole: undefined,
      accessibilityOverride: MenuBehavior,
      overridenRootRole: 'menu',
    })

    describe('aria hidden', () => {
      test('set to true by default', () => {
        const renderedComponent = getTestingRenderedComponent(Icon, <Icon />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })
    })
  })
})
