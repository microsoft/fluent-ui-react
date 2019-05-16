import * as React from 'react'

import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, { requiredProps: { buttonRef: React.createRef<HTMLElement>() } })

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: { as: 'h3' },
        defaultRootRole: undefined,
      })
    })
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, { defaultRootRole: 'heading' })
    })

    describe('aria-disabled', () => {
      test('is set to true, if active and cannot be collapsed', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle active canBeCollapsed={false} />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-disabled',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('true')
      })

      test('is set to false, if active and can be collapsed', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle active canBeCollapsed />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-disabled',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('false')
      })

      test('is set to false, if not active', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-disabled',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('false')
      })
    })

    describe('aria-expanded', () => {
      test('is set to true, if actived', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle active />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-expanded',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('true')
      })

      test('is set to true, if actived', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-expanded',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('false')
      })
    })

    describe('aria-controls', () => {
      test('takes the value of the contentId', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle contentId={'nice-contentId'} />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'aria-controls',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('nice-contentId')
      })
    })

    describe('tabIndex', () => {
      test('is always `0`', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle />,
        )
        expect(
          getRenderedAttribute(
            renderedComponent,
            'tabindex',
            `.${AccordionTitle.slotClassNames.button}`,
          ),
        ).toBe('0')
      })
    })
  })
})
