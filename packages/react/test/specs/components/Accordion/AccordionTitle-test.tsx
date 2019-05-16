import * as React from 'react'
import * as _ from 'lodash'

import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, {
    eventTargets: {
      onClick: `.${AccordionTitle.slotClassNames.button}`,
    },
    requiredProps: {
      buttonRef: _.noop,
    },
  })

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: {
          as: 'h3',
          buttonRef: _.noop,
        },
        defaultRootRole: undefined,
      })
    })
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: {
          buttonRef: _.noop,
        },
        defaultRootRole: 'heading',
      })
    })

    describe('aria-disabled', () => {
      test('is set to true, if active and cannot be collapsed', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle active canBeCollapsed={false} buttonRef={_.noop} />,
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
          <AccordionTitle active canBeCollapsed buttonRef={_.noop} />,
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
          <AccordionTitle buttonRef={_.noop} />,
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
          <AccordionTitle buttonRef={_.noop} active />,
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
          <AccordionTitle buttonRef={_.noop} />,
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
          <AccordionTitle buttonRef={_.noop} contentId={'nice-contentId'} />,
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
          <AccordionTitle buttonRef={_.noop} />,
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
