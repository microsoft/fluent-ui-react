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
      overriddenRootRole: 'menu',
    })

    describe('aria hidden', () => {
      it('icon - set to true by default', () => {
        const renderedComponent = getTestingRenderedComponent(Icon, <Icon />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      it('svg - set to true by default', () => {
        const renderedComponent = getTestingRenderedComponent(Icon, <Icon svg />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })
    })
  })
})
