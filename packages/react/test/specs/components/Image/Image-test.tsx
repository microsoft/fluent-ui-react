import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'

import { Image } from '@fluentui/react'
import { mountWithProviderAndGetComponent } from '../../../utils'

describe('Image', () => {
  isConformant(Image)

  describe('accessibility', () => {
    handlesAccessibility(Image, {
      defaultRootRole: undefined,
    })

    describe('aria-hidden', () => {
      test('is set to true, if alt attribute is not defined', () => {
        const renderedComponent = mountWithProviderAndGetComponent(Image, <Image />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      test('is not set, if alt attribute is defined', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          Image,
          <Image alt="any alt description" />,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe(undefined)
      })
    })
  })
})
