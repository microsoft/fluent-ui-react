import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

import Dropdown from 'src/components/Dropdown/Dropdown'
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput'
import DropdownSelectedItem from 'src/components/Dropdown/DropdownSelectedItem'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

jest.dontMock('keyboard-key')
jest.useFakeTimers()

describe('Dropdown', () => {
  const items = ['item1', 'item2', 'item3', 'item4', 'item5']
  isConformant(Dropdown, { hasAccessibilityProp: false })

  describe('clearable', () => {
    it('calls onChange on Icon click with an `empty` value', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown clearable onSelectedChange={onSelectedChange} items={items} value={items[0]} />,
      )

      wrapper.find({ className: Dropdown.slotClassNames.clearIndicator }).simulate('click')
      expect(onSelectedChange).toBeCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({
          activeSelectedIndex: undefined,
          highlightedIndex: null,
          open: false,
          searchQuery: undefined,
          value: null,
        }),
      )
    })
  })

  describe('open', () => {
    const onOpenChange = jest.fn()

    afterEach(() => {
      onOpenChange.mockReset()
    })

    it('is "false" when closed by trigger button click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click').simulate('click')

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when closed by hitting Escape in search input', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} search items={items} />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'test' } })
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when closed by hitting Escape in items list', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} multiple items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('click')
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when an item has been selected', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(0)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })
  })

  describe('highlightedIndex', () => {
    const onOpenChange = jest.fn()

    afterEach(() => {
      onOpenChange.mockReset()
    })

    it('is null when opened by click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is null when opened by toggle indicator click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is first item index when opened by arrow down key', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is last item index when opened by arrow up key', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: items.length - 1,
          open: true,
        }),
      )
    })

    it('has the provided prop value when opened by click', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex,
          open: true,
        }),
      )
    })

    it('has the (provided prop value + 1) when opened by arrow down key', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: highlightedIndex + 1,
          open: true,
        }),
      )
    })

    it('has the provided (prop value - 1) when opened by arrow up key', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: highlightedIndex - 1,
          open: true,
        }),
      )
    })

    it('is 0 when the provided prop value is last item index and opened by arrow down key', () => {
      const highlightedIndex = items.length - 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is last item index when the provided prop value is 0 and opened by arrow up key', () => {
      const highlightedIndex = 0
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: items.length - 1,
          open: true,
        }),
      )
    })

    it('is defaultHighlightedIndex prop value at first opening', () => {
      const defaultHighlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown
          defaultHighlightedIndex={defaultHighlightedIndex}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: defaultHighlightedIndex,
          open: true,
        }),
      )
    })

    it('is null on second and subsequent open when defaultHighlightedIndex prop is passed', () => {
      const wrapper = mountWithProvider(
        <Dropdown defaultHighlightedIndex={1} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('click')
        .simulate('click')
        .simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is 0 on first open when highlightFirstItemOnOpen prop is provided', () => {
      const wrapper = mountWithProvider(
        <Dropdown highlightFirstItemOnOpen onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is 0 on second and subsequent open when highlightFirstItemOnOpen prop is provided', () => {
      const wrapper = mountWithProvider(
        <Dropdown highlightFirstItemOnOpen onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton
        .simulate('click')
        .simulate('click')
        .simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is 0 on searchQuery first change and when highlightFirstItemOnOpen prop is provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          highlightFirstItemOnOpen
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput.simulate('click').simulate('change', { target: { value: 'i' } })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
      expect(onSearchQueryChange).toBeCalledTimes(1)
      expect(onSearchQueryChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'i',
          highlightedIndex: 0,
        }),
      )
    })

    it('is reset to 0 on searchQuery change and when highlightFirstItemOnOpen prop is provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          highlightFirstItemOnOpen
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'i' } })
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // now it's on index 1.
        .simulate('change', { target: { value: 'in' } }) // now it should reset to 0.

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'in',
          highlightedIndex: 0,
        }),
      )
    })

    it('is null on searchQuery first change and when highlightFirstItemOnOpen prop is not provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput.simulate('click').simulate('change', { target: { value: 'i' } })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
      expect(onSearchQueryChange).toBeCalledTimes(1)
      expect(onSearchQueryChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'i',
          highlightedIndex: null,
        }),
      )
    })

    it('is reset to null on searchQuery change and when highlightFirstItemOnOpen prop is not provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'i' } }) // no item highlighted.
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // highlight on index 0.
        .simulate('change', { target: { value: 'in' } })

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'in',
          highlightedIndex: null,
        }),
      )
    })

    it('is the index of the value previously selected when opened', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 1,
          open: true,
        }),
      )
    })

    it('is the index of the (value previously selected + 1) when opened by arrow down', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 2,
          open: true,
        }),
      )
    })

    it('is the index of the (value previously selected - 1) when opened by arrow up', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is changed correctly on arrow down navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      _.times(2, index => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

        expect(dropdown.state('highlightedIndex')).toBe(index)
      })
    })

    it('is changed correctly on arrow up navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      _.times(2, index => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

        expect(dropdown.state('highlightedIndex')).toBe(items.length - 1 - index)
      })
    })

    it('wraps to start and end on navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} defaultHighlightedIndex={1} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(dropdown.state('highlightedIndex')).toBe(items.length - 1)

      itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(dropdown.state('highlightedIndex')).toBe(0)
    })
  })

  describe('value', () => {
    it('is set by clicking on item', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const item = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(itemSelectedIndex)
      item.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
        }),
      )
    })

    it('is set by using Enter on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)
      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is set by using Tab on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab' })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is set by using Shift+Tab on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', shiftKey: true })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is replaced when another item is selected', () => {
      const itemSelectedIndex = 3
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(1)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      triggerButton.simulate('click')
      const itemAtIndex = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(2)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
        }),
      )
    })

    it('has an array of items if more items are selected and the multiple prop is supplied', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} multiple items={items} />,
      )
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemAtIndex1 = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(1)
      itemAtIndex1.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      triggerButton.simulate('click')
      const itemAtIndex2 = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(3)
      itemAtIndex2.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(2)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: ['item2', 'item5'],
        }),
      )
    })

    it('has items removed on empty search query backspace', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} multiple items={items} search />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')
      let firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(0)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      toggleIndicator.simulate('click')
      firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(0)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      searchInput
        .simulate('click')
        .simulate('keydown', { keyCode: keyboardKey.Backspace, key: 'Backspace' })

      expect(onSelectedChange).toHaveBeenCalledTimes(3)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: [items[0]],
        }),
      )
    })
  })

  describe('getA11ySelectionMessage', () => {
    afterEach(() => {
      jest.runAllTimers()
    })

    it('creates message container element', () => {
      mountWithProvider(<Dropdown options={[]} getA11ySelectionMessage={{}} />)
      expect(
        document.querySelector(
          `[role="status"][aria-live="polite"][aria-relevant="additions text"]`,
        ),
      ).toBeTruthy()
    })

    it('has the onAdd message inserted and cleared after an item has been added to selection', () => {
      const wrapper = mountWithProvider(
        <Dropdown
          multiple
          items={items}
          getA11ySelectionMessage={{ onAdd: item => 'bla bla added' }}
        />,
      )
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(0)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(dropdown.state('a11ySelectionStatus')).toBe('bla bla added')

      jest.runAllTimers()

      expect(dropdown.state('a11ySelectionStatus')).toBe('')
    })

    it('has the onRemove message inserted and cleared after an item has been removed from selection', () => {
      const wrapper = mountWithProvider(
        <Dropdown
          multiple
          items={items}
          getA11ySelectionMessage={{ onRemove: item => 'bla bla removed' }}
        />,
      )
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(0)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      jest.runAllTimers()
      const removeIcon = wrapper.find(`span.${DropdownSelectedItem.slotClassNames.icon}`)
      removeIcon.simulate('click')

      expect(dropdown.state('a11ySelectionStatus')).toBe('bla bla removed')

      jest.runAllTimers()

      expect(dropdown.state('a11ySelectionStatus')).toBe('')
    })
  })

  describe('searchQuery', () => {
    it('will close after reset', () => {
      const dropdown = mountWithProvider(<Dropdown items={items} search />).find(Dropdown)

      dropdown.find('input').simulate('change', { target: { value: 'foo' } })
      expect(dropdown.state('open')).toBe(true)
      expect(dropdown.state('searchQuery')).toBe('foo')

      dropdown.find('input').simulate('change', { target: { value: '' } })
      expect(dropdown.state('open')).toBe(false)
      expect(dropdown.state('searchQuery')).toBe('')
    })

    it('is the string equivalent of selected item in single search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search items={items} />,
      )
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')
      const itemAtIndex = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
          searchQuery: items[itemSelectedIndex],
        }),
      )
    })

    it('is set to empty by hitting Escape in search input', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSearchQueryChange={onSearchQueryChange} search items={items} />,
      )
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'test' } })
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: '',
        }),
      )
    })

    it('is set to empty when item is selected in multiple search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search multiple items={items} />,
      )
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')
      const itemAtIndex = wrapper.find(`li.${Dropdown.slotClassNames.item}`).at(itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[itemSelectedIndex]],
          searchQuery: '',
        }),
      )
    })
  })

  describe('toggleIndicator', () => {
    it('closes the open menu on click', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      triggerButton.simulate('click')
      toggleIndicator.simulate('click')

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('opens the menu and moves focus to list in selection mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(
        wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`).getDOMNode(),
      )
    })

    it('opens the menu and moves focus to input in search mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} search />)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(
        wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`).getDOMNode(),
      )
    })
  })

  describe('moveFocusOnTab', () => {
    const preventDefault = jest.fn()

    afterEach(() => {
      preventDefault.mockReset()
    })

    it('keeps focus on trigger button when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('keeps focus on input when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} />)
      const toggleIndicator = wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`)

      toggleIndicator.simulate('click')
      const searchInput = wrapper.find(`input.${DropdownSearchInput.slotClassNames.input}`)
      searchInput
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('allows focus to move to next item when passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} moveFocusOnTab />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).not.toBeCalled()
    })
  })

  describe('items', () => {
    it('have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const stopImmediatePropagation = jest.fn()
      const mockedEvent = { stopPropagation, nativeEvent: { stopImmediatePropagation } }
      const items = [{ header: 'Venom', onClick }]
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      const firstItem = wrapper.find(`li.${Dropdown.slotClassNames.item}`)
      firstItem.simulate('click', mockedEvent)

      expect(onClick).toBeCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      )
      expect(stopPropagation).toBeCalledTimes(1)
      expect(stopImmediatePropagation).toBeCalledTimes(1)
    })

    it('when selected have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const stopImmediatePropagation = jest.fn()
      const mockedEvent = { stopPropagation, nativeEvent: { stopImmediatePropagation } }
      const items = [{ header: 'Venom', onClick }]
      const wrapper = mountWithProvider(<Dropdown items={items} value={items} multiple />)
      const selectedItemHeaderAtIndex0 = wrapper
        .find(`span.${DropdownSelectedItem.slotClassNames.header}`)
        .at(0)

      selectedItemHeaderAtIndex0.simulate('click', mockedEvent)

      expect(onClick).toBeCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      )
      expect(stopPropagation).toBeCalledTimes(1)
    })
  })
})
