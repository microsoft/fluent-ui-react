import * as React from 'react'
import { isConformant, handlesAccessibility, getProp } from 'test/specs/commonTests'

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
  })

  describe('Image accessibility - aria hidden', () => {
    test('set to true if alt is not defined', () => {
      const renderedComponent = getTestingRenderedComponent(Image, <Image />)
      expect(getProp(renderedComponent, 'aria-hidden', '')).toBe('true')
    })
  })

  describe('Image accessibility - aria hidden', () => {
    test('is not set if alt is defined', () => {
      const renderedComponent = getTestingRenderedComponent(
        Image,
        <Image alt="any alt description" />,
      )
      expect(getProp(renderedComponent, 'aria-hidden', '')).toBe(undefined)
    })
  })
})
