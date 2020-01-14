import { AccordionTitle } from '@fluentui/react'
import { isConformant, handlesAccessibility } from '../../commonTests'

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
