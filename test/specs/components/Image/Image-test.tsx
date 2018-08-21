import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'

import Image from 'src/components/Image/Image'
import { MenuBehavior } from 'src/lib/accessibility'
import { getTestingRenderedComponent } from 'test/utils'

describe('Image', () => {
  isConformant(Image)

  describe('Image accessibility', () => {
    handlesAccessibility(Image, {
      defaultRootRole: undefined,
      accessibilityOverride: MenuBehavior,
      overriddenRootRole: 'menu',
    })

    test('set to true if alt is not defined', () => {
      const renderedComponent = getTestingRenderedComponent(Image, <Image />)
      expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
    })

    test('is not set if alt is defined', () => {
      const renderedComponent = getTestingRenderedComponent(
        Image,
        <Image alt="any alt description" />,
      )
      expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe(undefined)
    })
  })
})
