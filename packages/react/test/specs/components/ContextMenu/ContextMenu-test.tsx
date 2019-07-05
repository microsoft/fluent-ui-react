import * as React from 'react'

import ContextMenu from 'src/components/ContextMenu/ContextMenu'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'

const mockMenu = { items: ['1', '2', '3'] }

describe('ContextMenu', () => {
  isConformant(ContextMenu)

  describe('accessibility', () => {
    handlesAccessibility(ContextMenu, {
      defaultRootRole: 'none',
    })

    describe('onOpenChange', () => {
      test('is called on click', () => {
        const spy = jest.fn()

        mountWithProvider(<ContextMenu trigger={<button />} menu={mockMenu} onOpenChange={spy} />)
          .find('button')
          .simulate('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
      })

      test('is called on click when controlled', () => {
        const spy = jest.fn()

        mountWithProvider(
          <ContextMenu open={false} trigger={<button />} menu={mockMenu} onOpenChange={spy} />,
        )
          .find('button')
          .simulate('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
      })
    })

    describe('ID handling', () => {
      test('trigger id is used', () => {
        const contextMenu = mountWithProvider(
          <ContextMenu trigger={<button id="test-id" />} menu={mockMenu} />,
        )
        const button = contextMenu.find('button')
        button.simulate('click')
        const menu = contextMenu.find('ul')
        const triggerId = button.prop('id')

        expect(triggerId).toEqual('test-id')
        expect(menu.prop('aria-labelledby')).toEqual(triggerId)
      })

      test('trigger id is generated if not provided', () => {
        const contextMenu = mountWithProvider(<ContextMenu trigger={<button />} menu={mockMenu} />)
        const button = contextMenu.find('button')
        button.simulate('click')
        // const menu = contextMenu.find('ul')
        const triggerId = button.prop('id')

        expect(triggerId).toMatch(/contextmenu-trigger-\d+/)
        // expect(menu.prop('aria-labelledby')).toEqual(triggerId)
      })

      test('menu id is used', () => {
        const contextMenu = mountWithProvider(
          <ContextMenu trigger={<button />} menu={{ ...mockMenu, id: 'test-id' }} />,
        )
        const button = contextMenu.find('button')
        button.simulate('click')
        const menu = contextMenu.find('ul')
        const menuId = menu.prop('id')

        expect(menuId).toEqual('test-id')
        expect(button.prop('aria-controls')).toEqual(menuId)
      })

      test('menu id is generated if not provided', () => {
        const contextMenu = mountWithProvider(<ContextMenu trigger={<button />} menu={mockMenu} />)
        const button = contextMenu.find('button')
        button.simulate('click')
        const menu = contextMenu.find('ul')
        const menuId = menu.prop('id')

        expect(menuId).toMatch(/contextmenu-menu-\d+/)
        // expect(button.prop('aria-controls')).toEqual(menuId)
      })
    })
  })
})
