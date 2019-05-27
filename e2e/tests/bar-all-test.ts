describe('Dropdown', () => {
  const triggerButton = '.ui-dropdown__trigger-button'
  const toggleIndicatior = '.ui-dropdown__toggle-indicator'
  const itemsList = '.ui-dropdown__items-list'
  const item = '.ui-dropdown__item'

  describe('Selection', () => {
    beforeEach(async () => {
      await e2e.goto('/maximize/dropdown-example-shorthand/false', triggerButton)
    })

    it('selects item on click', async () => {
      await e2e.clickOn(triggerButton)
      await e2e.clickOn(`${item}:nth-child(1)`)

      expect(await e2e.textOf(triggerButton)).toBe('Bruce Wayne')
    })

    it('selects next item by opening with ArrowDown', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('ArrowDown')

      await e2e.pressKey('Enter')

      expect(await e2e.textOf(triggerButton)).toBe('Natasha Romanoff')
    })

    it('selects next item by ArrowDown navigation', async () => {
      await e2e.clickOn(triggerButton)

      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('ArrowDown')

      await e2e.pressKey('Enter')

      expect(await e2e.textOf(triggerButton)).toBe('Steven Strange')
    })

    it('selects previous item by opening with ArrowUp', async () => {
      await e2e.clickOn(triggerButton)

      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('ArrowUp')

      await e2e.pressKey('Enter')

      expect(await e2e.textOf(triggerButton)).toBe('Bruce Wayne')
    })

    it('selects last item by click and ArrowUp navigation', async () => {
      await e2e.clickOn(triggerButton)

      await e2e.pressKey('ArrowUp')
      await e2e.pressKey('Enter')

      expect(await e2e.textOf(triggerButton)).toBe('Selina Kyle')
    })

    it('selects last item by opening with ArrowUp', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowUp')
      await e2e.pressKey('Enter')

      expect(await e2e.textOf(triggerButton)).toBe('Selina Kyle')
    })
  })
})
