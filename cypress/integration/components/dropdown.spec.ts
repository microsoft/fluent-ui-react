// import Dropdown from '@stardust-ui/react/src/components/Dropdown/Dropdown'
import Dropdown from '../../../packages/react/src/components/Dropdown/Dropdown'
import DropdownItem from '../../../packages/react/src/components/Dropdown/DropdownItem'
// import DropdownItem from '@stardust-ui/react/src/components/Dropdown/DropdownItem'

describe('Dropdown', () => {
  describe('Selection', () => {
    before(() => {
      cy.visit('/dropdown-example-shorthand/false')
    })

    it('select an option by click', () => {
      cy.get(Dropdown.slotClassNames.triggerButton).click()

      cy.get(`${DropdownItem.className}:nth-child(0)`).click()
      cy.get(Dropdown.slotClassNames.triggerButton).should('have.value', 'Bruce Wayne')
    })
  })
})
