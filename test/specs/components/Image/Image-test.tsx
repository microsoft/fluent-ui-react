import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'

import Image from 'src/components/Image/Image'
import { getTestingRenderedComponent } from 'test/utils'

describe('Image', () => {
  isConformant(Image)

  describe('accessibility', () => {
    handlesAccessibility(Image, {
      defaultRootRole: undefined,
    })

    describe('aria-hidden', () => {
      test('is set to true, if alt attribute is not defined', () => {
        const renderedComponent = getTestingRenderedComponent(Image, <Image />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      test('is not set, if alt attribute is defined', () => {
        const renderedComponent = getTestingRenderedComponent(
          Image,
          <Image alt="any alt description" />,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe(undefined)
      })
    })
  })
})
