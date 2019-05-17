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
      contentRef: _.noop,
    },
  })

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: {
          as: 'h3',
          contentRef: _.noop,
        },
        defaultRootRole: undefined,
      })
    })
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: {
          contentRef: _.noop,
        },
        defaultRootRole: 'heading',
      })
    })

    describe('aria-disabled', () => {
      test('is set to true, if active and cannot be collapsed', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionTitle,
          <AccordionTitle active canBeCollapsed={false} contentRef={_.noop} />,
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
          <AccordionTitle active canBeCollapsed contentRef={_.noop} />,
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
          <AccordionTitle contentRef={_.noop} />,
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
          <AccordionTitle contentRef={_.noop} active />,
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
          <AccordionTitle contentRef={_.noop} />,
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
          <AccordionTitle contentRef={_.noop} accordionContentId={'nice-contentId'} />,
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
          <AccordionTitle contentRef={_.noop} />,
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
