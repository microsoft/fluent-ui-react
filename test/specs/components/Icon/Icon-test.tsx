import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'

import Icon from '../../../../src/components/Icon/Icon'
import { getTestingRenderedComponent } from 'test/utils'

describe('Icon', () => {
  isConformant(Icon)

  describe('accessibility', () => {
    handlesAccessibility(Icon, {
      defaultRootRole: undefined,
    })

    describe('aria-hidden', () => {
      test('font-based - set to true by default', () => {
        const renderedComponent = getTestingRenderedComponent(Icon, <Icon />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      test('svg - set to true by default', () => {
        const renderedComponent = getTestingRenderedComponent(Icon, <Icon svg />)
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })
    })
  })
})
