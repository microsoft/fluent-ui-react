import * as React from 'react'

import AccordionContent from 'src/components/Accordion/AccordionContent'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'

describe('AccordionContent', () => {
  isConformant(AccordionContent)

  describe('accessiblity', () => {
    handlesAccessibility(AccordionContent)

    describe('aria-labelledby', () => {
      test('takes the value of the titleId prop', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionContent,
          <AccordionContent titleId={'nice-titleId'} />,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-labelledby', '')).toBe('nice-titleId')
      })
    })
  })
})
