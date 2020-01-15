import * as React from 'react'

import { AccordionContent } from '@fluentui/react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'
import { mountWithProviderAndGetComponent } from '../../../utils'

describe('AccordionContent', () => {
  isConformant(AccordionContent)

  describe('accessiblity', () => {
    handlesAccessibility(AccordionContent)

    describe('aria-labelledby', () => {
      test('takes the value of the titleId prop', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionContent,
          <AccordionContent accordionTitleId={'nice-titleId'} />,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-labelledby', '')).toBe('nice-titleId')
      })
    })
  })
})
