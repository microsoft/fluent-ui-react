import * as React from 'react'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import Image from 'src/components/Image/Image'
import { MenuBehavior } from 'src/lib/accessibility'
import { getTestingRenderedComponent } from 'test/utils'

const getProp = (renderedComponent, propName, partSelector) => {
  const target = partSelector
    ? renderedComponent.render().find(partSelector)
    : renderedComponent.render()

  return target.first().prop(propName)
}

describe('Image', () => {
  isConformant(Image)

  describe('Image accessibility', () => {
    handlesAccessibility(Image, {
      defaultRootRole: undefined,
      accessibilityOverride: MenuBehavior,
      overridenRootRole: 'menu',
    })
  })

  describe('Image accessibility - aria hidden', () => {
    test('set to true if alt is not defined', () => {
      const renderedComponent = getTestingRenderedComponent(
        Image,
        <Image avatar src="public/images/avatar/small/chris.jpg" />,
      )
      const ariaHiddenAttr = getProp(renderedComponent, 'aria-hidden', '')
      expect(ariaHiddenAttr).toBe('true')
    })
  })
})
