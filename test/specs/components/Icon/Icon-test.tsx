import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'

import Icon from '../../../../src/components/Icon/Icon'
import { mountWithProviderAndGetComponent } from 'test/utils'
import { ThemeInput } from 'src/themes/types'

describe('Icon', () => {
  isConformant(Icon, 'Icon')

  describe('accessibility', () => {
    handlesAccessibility(Icon, {
      defaultRootRole: undefined,
    })

    describe('aria-hidden', () => {
      const themeWithDefinedIcons: ThemeInput = {
        icons: {
          svgIcon: {
            icon: () => (
              <svg>
                <p />
              </svg>
            ),
          },
          fontIcon: {
            icon: { fontFamily: 'Icons', content: `'\\f0152'` },
          },
        },
      }

      test('font-based - set to true by default', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          Icon,
          <Icon name="fontIcon" />,
          undefined,
          themeWithDefinedIcons,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      test('svg - set to true by default', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          Icon,
          <Icon name="svgIcon" />,
          undefined,
          themeWithDefinedIcons,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })
    })
  })
})
