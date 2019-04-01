const triggerButton = '.ui-dropdown__trigger-button'
const item = '.ui-dropdown__item'

describe('Dropdown', () => {
  describe('Selection', () => {
    const selectionComponentPath = '/dropdown-example-shorthand/false'
    before(() => {
      cy.visit(selectionComponentPath)
    })

    it('selects item on click', () => {
      cy.get(triggerButton).click()
      cy.get(`${item}:nth-child(1)`).click()
      cy.get(triggerButton).should('have.text', 'Bruce Wayne')
    })

    it('selects next item by opening with ArrowDown', () => {
      cy.get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowDown' })
        .trigger('keyup', { key: 'ArrowDown' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Natasha Romanoff')
    })

    it('selects next item by ArrowDown navigation', () => {
      cy.get(triggerButton)
        .click()
        .trigger('keydown', { key: 'ArrowDown' })
        .trigger('keyup', { key: 'ArrowDown' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Steven Strange')
    })

    it('selects previous item by opening with ArrowUp', () => {
      cy.get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowUp' })
        .trigger('keyup', { key: 'ArrowUp' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Natasha Romanoff')
    })

    it('selects previous item by ArrowUp navigation', () => {
      cy.get(triggerButton)
        .click()
        .trigger('keydown', { key: 'ArrowUp' })
        .trigger('keyup', { key: 'ArrowUp' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Bruce Wayne')
    })

    it('selects last item by opening with ArrowUp', () => {
      cy.get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowUp' })
        .trigger('keyup', { key: 'ArrowUp' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Selina Kyle')
    })

    it('selects last item by opening with ArrowDown', () => {
      cy.get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowDown' })
        .trigger('keyup', { key: 'ArrowDown' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Bruce Wayne')
    })

    it('selects first item by first opening with ArrowDown', () => {
      cy.visit(selectionComponentPath)
        .get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowDown' })
        .trigger('keyup', { key: 'ArrowDown' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Bruce Wayne')
    })

    it('selects first item by first opening with ArrowUp', () => {
      cy.visit(selectionComponentPath)
        .get(triggerButton)
        .focus()
        .trigger('keydown', { key: 'ArrowUp' })
        .trigger('keyup', { key: 'ArrowUp' })
        .trigger('keydown', { key: 'Enter' })
        .trigger('keyup', { key: 'Enter' })
        .should('have.text', 'Selina Kyle')
    })
  })
})
