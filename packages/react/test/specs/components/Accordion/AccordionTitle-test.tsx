import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, {
    eventTargets: {
      onClick: `.${AccordionTitle.slotClassNames.content}`,
    },
  })

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: { as: 'h3' },
        defaultRootRole: undefined,
      })
    })
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, {
        defaultRootRole: 'heading',
      })
    })
  })
})
