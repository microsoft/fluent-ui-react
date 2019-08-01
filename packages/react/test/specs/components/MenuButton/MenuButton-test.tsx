import * as React from 'react'

import MenuButton from 'src/components/MenuButton/MenuButton'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'

const mockMenu = { items: ['1', '2', '3'] }

describe('MenuButton', () => {
  isConformant(MenuButton)

  describe('accessibility', () => {
    handlesAccessibility(MenuButton, {
      defaultRootRole: 'none',
    })

    describe('onOpenChange', () => {
      test('is called on click', () => {
        const spy = jest.fn()

        mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} onOpenChange={spy} />)
          .find('button')
          .simulate('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
      })

      test('is called on click when controlled', () => {
        const spy = jest.fn()

        mountWithProvider(
          <MenuButton open={false} trigger={<button />} menu={mockMenu} onOpenChange={spy} />,
        )
          .find('button')
          .simulate('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
      })
    })

    describe('ID handling', () => {
      test('trigger id is used', () => {
        const menuButton = mountWithProvider(
          <MenuButton trigger={<button id="test-id" />} menu={mockMenu} />,
        )
        const button = menuButton.find('button')
        button.simulate('click')
        const menu = menuButton.find('ul')
        const triggerId = button.prop('id')

        expect(triggerId).toEqual('test-id')
        expect(menu.prop('aria-labelledby')).toEqual(triggerId)
      })

      test('trigger id is generated if not provided', () => {
        const menuButton = mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} />)
        const button = menuButton.find('button')
        button.simulate('click')
        // const menu = menuButton.find('ul')
        const triggerId = button.prop('id')

        expect(triggerId).toMatch(/menubutton-trigger-\d+/)
        // TODO: component does not persist generated ids across re-renders
        // expect(menu.prop('aria-labelledby')).toEqual(triggerId)
      })

      test('menu id is used', () => {
        const menuButton = mountWithProvider(
          <MenuButton trigger={<button />} menu={{ ...mockMenu, id: 'test-id' }} />,
        )
        const button = menuButton.find('button')
        button.simulate('click')
        const menu = menuButton.find('ul')
        const menuId = menu.prop('id')

        expect(menuId).toEqual('test-id')
        expect(button.prop('aria-controls')).toEqual(menuId)
      })

      test('menu id is generated if not provided', () => {
        const menuButton = mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} />)
        const button = menuButton.find('button')
        button.simulate('click')
        const menu = menuButton.find('ul')
        const menuId = menu.prop('id')

        expect(menuId).toMatch(/menubutton-menu-\d+/)
        // TODO: component does not persist generated ids across re-renders
        // expect(button.prop('aria-controls')).toEqual(menuId)
      })
    })
  })
})
