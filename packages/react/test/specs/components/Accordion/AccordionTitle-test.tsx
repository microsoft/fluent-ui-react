import * as _ from 'lodash'

import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, {
    eventTargets: {
      onClick: `.${AccordionTitle.slotClassNames.content}`,
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
  })
})
