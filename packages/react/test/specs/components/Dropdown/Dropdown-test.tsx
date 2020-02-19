import * as React from 'react'

import { renderDropdown, items, getItemIdRegexByIndex } from './test-utils'
import Dropdown from 'src/components/Dropdown/Dropdown'
import DropdownSelectedItem from 'src/components/Dropdown/DropdownSelectedItem'
import { isConformant } from 'test/specs/commonTests'
import { findIntrinsicElement } from 'test/utils'
import { DropdownItemProps } from 'src/components/Dropdown/DropdownItem'
import { ShorthandValue } from 'src/types'

jest.dontMock('keyboard-key')
jest.useFakeTimers()

describe('Dropdown', () => {
  isConformant(Dropdown, {
    hasAccessibilityProp: false,
    autoControlledProps: [
      'highlightedIndex',
      'open',
      'searchQuery',
      'activeSelectedIndex',
      'value',
    ],
  })

  describe('clearable', () => {
    it('value is cleared at Icon click', () => {
      const { triggerButton, clickOnClearIndicator } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
      })

      clickOnClearIndicator()

      expect(triggerButton).toHaveTextContent('')
    })

    it('calls onChange on Icon click with an `empty` value', () => {
      const onChange = jest.fn()
      const { clickOnClearIndicator } = renderDropdown({
        onChange,
        defaultValue: items[0],
        clearable: true,
      })

      clickOnClearIndicator()

      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
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
    it('it takes the value of the controlled prop', () => {
      const { getItems, clickOnItemAtIndex } = renderDropdown({ open: true })

      expect(getItems()).toHaveLength(items.length)

      clickOnItemAtIndex(0)

      expect(getItems()).toHaveLength(items.length)
    })

    it('it takes the value of the default prop but can be changed', () => {
      const { getItems, clickOnItemAtIndex } = renderDropdown({ defaultOpen: true })

      expect(getItems()).toHaveLength(items.length)

      clickOnItemAtIndex(0)

      expect(getItems()).toHaveLength(0)
    })

    it('is "true" when opened by trigger button click', () => {
      const { getItems, clickOnTriggerButton } = renderDropdown()

      clickOnTriggerButton()

      expect(getItems()).toHaveLength(items.length)
    })

    it('is "false" when closed by trigger button click', () => {
      const { clickOnTriggerButton, getItems } = renderDropdown({
        defaultOpen: true,
      })

      clickOnTriggerButton()

      expect(getItems()).toHaveLength(0)
    })

    it('calls onOpenChange with a value that represents the open state', () => {
      const onOpenChange = jest.fn()
      const { clickOnTriggerButton } = renderDropdown({
        onOpenChange,
      })

      clickOnTriggerButton()

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: true,
        }),
      )

      clickOnTriggerButton()

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "true" when opened by toggle indicator click', () => {
      const { clickOnToggleIndicator, getItems } = renderDropdown()

      clickOnToggleIndicator()

      expect(getItems()).toHaveLength(items.length)
    })

    it('is "false" when closed by toggle indicator click', () => {
      const { clickOnToggleIndicator, getItems } = renderDropdown({
        defaultOpen: true,
      })

      clickOnToggleIndicator()

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when closed by hitting Escape in search input', () => {
      const { keyDownOnSearchInput, getItems } = renderDropdown({
        search: true,
        defaultOpen: true,
      })

      keyDownOnSearchInput('Escape')

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when closed by hitting Escape in items list', () => {
      const { keyDownOnItemsList, getItems } = renderDropdown({ defaultOpen: true })

      expect(items).toHaveLength(items.length)

      keyDownOnItemsList('Escape')

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when an item has been selected', () => {
      const { clickOnItemAtIndex, getItems } = renderDropdown({ defaultOpen: true })

      clickOnItemAtIndex(0)

      expect(getItems()).toHaveLength(0)
    })

    it('when set to "true" by trigger button click will move focus to the items list', () => {
      const { clickOnTriggerButton, itemsList } = renderDropdown()

      clickOnTriggerButton()

      expect(document.activeElement).toEqual(itemsList)
    })

    it('is "false" when blurred by Tab on items list', () => {
      const { getItems, keyDownOnItemsList } = renderDropdown({ defaultOpen: true })

      keyDownOnItemsList('Tab')

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when blurred by Shift+Tab on items list', () => {
      const { getItems, keyDownOnItemsList } = renderDropdown({ defaultOpen: true })

      keyDownOnItemsList('Tab', { shiftKey: true })

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when blurred by Tab on searchInput', () => {
      const { getItems, keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        search: true,
      })

      keyDownOnSearchInput('Tab')

      expect(getItems()).toHaveLength(0)
    })

    it('is "false" when blurred by Shift+Tab on items list', () => {
      const { getItems, keyDownOnSearchInput } = renderDropdown({ defaultOpen: true, search: true })

      keyDownOnSearchInput('Tab', { shiftKey: true })

      expect(getItems()).toHaveLength(0)
    })
  })

  describe('highlightedIndex', () => {
    afterEach(() => {
      jest.runAllTimers()
    })

    it('is null when opened by click', () => {
      const { clickOnTriggerButton, itemsList } = renderDropdown()

      clickOnTriggerButton()

      expect(itemsList).not.toHaveAttribute('aria-activedescendant')
    })

    it('is null when opened by toggle indicator click', () => {
      const { clickOnToggleIndicator, itemsList } = renderDropdown()

      clickOnToggleIndicator()

      expect(itemsList).not.toHaveAttribute('aria-activedescendant')
    })

    it('is first item index when opened by arrow down key', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown()

      keyDownOnTriggerButton('ArrowDown')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is last item index when opened by arrow up key', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown()

      keyDownOnTriggerButton('ArrowUp')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      )
    })

    it('has the provided prop value when opened by click', () => {
      const highlightedIndex = 2
      const { clickOnTriggerButton, itemsList } = renderDropdown({
        highlightedIndex,
      })

      clickOnTriggerButton()

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      )
    })

    it('has the provided prop value when opened by arrow down key', () => {
      const highlightedIndex = 1
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({
        highlightedIndex,
      })

      keyDownOnTriggerButton('ArrowDown')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      )
    })

    it('has the provided prop value when opened by arrow up key', () => {
      const highlightedIndex = 1
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({
        highlightedIndex,
      })

      keyDownOnTriggerButton('ArrowUp')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      )
    })

    it('is defaultHighlightedIndex prop value at first opening, then null', () => {
      const defaultHighlightedIndex = 2
      const { clickOnTriggerButton, itemsList } = renderDropdown({
        defaultHighlightedIndex,
      })

      clickOnTriggerButton()

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(defaultHighlightedIndex)),
      )

      clickOnTriggerButton()
      clickOnTriggerButton()

      expect(itemsList).not.toHaveAttribute('aria-activedescendant')
    })

    it('is 0 on every open when highlightFirstItemOnOpen prop is provided', () => {
      const { clickOnTriggerButton, itemsList } = renderDropdown({
        highlightFirstItemOnOpen: true,
      })

      clickOnTriggerButton()

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      clickOnTriggerButton()
      clickOnTriggerButton()

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is set to 0 on searchQuery change and when highlightFirstItemOnOpen prop is provided', () => {
      const { changeSearchInput, keyDownOnSearchInput, searchInput } = renderDropdown({
        highlightFirstItemOnOpen: true,
        search: true,
      })

      changeSearchInput('i')

      expect(searchInput).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      keyDownOnSearchInput('ArrowDown')

      expect(searchInput).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(1)),
      )

      changeSearchInput('it')

      expect(searchInput).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is null on searchQuery change and when highlightFirstItemOnOpen prop is not provided', () => {
      const { changeSearchInput, keyDownOnSearchInput, searchInput } = renderDropdown({
        search: true,
      })

      changeSearchInput('i')

      expect(searchInput).not.toHaveAttribute('aria-activedescendant')

      keyDownOnSearchInput('ArrowDown')

      expect(searchInput).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      changeSearchInput('it')

      expect(searchInput).not.toHaveAttribute('aria-activedescendant')
    })

    it('is the index of the value previously selected when opened', () => {
      const highlightedIndex = 2
      const { clickOnTriggerButton, itemsList } = renderDropdown({
        value: items[highlightedIndex],
      })

      clickOnTriggerButton()

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      )
    })

    it('is the index of the (value previously selected + 1) when opened by arrow down', () => {
      const highlightedIndex = 2
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({
        value: items[highlightedIndex],
      })

      keyDownOnTriggerButton('ArrowDown')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex + 1)),
      )
    })

    it('is the index of the (value previously selected - 1) when opened by arrow up', () => {
      const highlightedIndex = 2
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({
        value: items[highlightedIndex],
      })

      keyDownOnTriggerButton('ArrowUp')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex - 1)),
      )
    })

    it('is changed correctly on arrow down navigation', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown()

      for (let index = 0; index < items.length; index++) {
        keyDownOnTriggerButton('ArrowDown')

        expect(itemsList).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(index)),
        )
      }
    })

    it('is changed correctly on arrow up navigation', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown()

      for (let index = 0; index < items.length; index++) {
        keyDownOnTriggerButton('ArrowUp')

        expect(itemsList).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(items.length - 1 - index)),
        )
      }
    })

    it('is changed correctly on arrow down and shift navigation', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({ defaultOpen: true })

      keyDownOnTriggerButton('ArrowDown', { shiftKey: true })

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(4)),
      )
    })

    it('is changed correctly on arrow up and shift navigation', () => {
      const { keyDownOnTriggerButton, itemsList } = renderDropdown({
        defaultHighlightedIndex: items.length - 1,
        defaultOpen: true,
      })

      keyDownOnTriggerButton('ArrowUp', { shiftKey: true })

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is changed correctly on home key navigation', () => {
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      })

      keyDownOnItemsList('Home')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is changed correctly on end key navigation', () => {
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      })

      keyDownOnItemsList('End')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      )
    })

    it('wraps to start and end on navigation', () => {
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        defaultHighlightedIndex: 0,
        defaultOpen: true,
      })

      keyDownOnItemsList('ArrowUp')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      )

      keyDownOnItemsList('ArrowDown')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('is updated correctly when hovering over items', () => {
      const { mouseOverItemAtIndex, itemsList } = renderDropdown({
        defaultOpen: true,
      })

      mouseOverItemAtIndex(1)

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(1)),
      )

      mouseOverItemAtIndex(3)

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(3)),
      )
    })

    it('is updated correctly when hovering over items and using arrow keys to navigate', () => {
      const { mouseOverItemAtIndex, keyDownOnItemsList, itemsList } = renderDropdown({
        defaultOpen: true,
      })

      mouseOverItemAtIndex(1)
      keyDownOnItemsList('ArrowDown')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(2)),
      )

      mouseOverItemAtIndex(4)
      keyDownOnItemsList('ArrowUp')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(3)),
      )
    })

    it('jumps to the item starting with the character key pressed', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        items,
        defaultOpen: true,
      })

      keyDownOnItemsList('P')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(1)),
      )
    })

    it('jumps starting from the current highlightedIndex on character key press', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        items,
        defaultHighlightedIndex: 1,
        defaultOpen: true,
      })

      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(2)),
      )
    })

    it('wraps to the start of the list when no options remain', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        items,
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      })

      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('jumps from item to item when pressing the same key with enough time in between', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        items,
        defaultOpen: true,
      })

      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      jest.runAllTimers()
      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(2)),
      )

      jest.runAllTimers()
      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )
    })

    it('jumps to the item starting with the keys tapped in rapid succession', () => {
      const items = ['Albert', 'Alfred', 'Alena', 'Ali']
      const { keyDownOnItemsList, itemsList } = renderDropdown({
        items,
        defaultOpen: true,
      })

      keyDownOnItemsList('A')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      jest.advanceTimersByTime(Dropdown.charKeyPressedCleanupTime / 2)
      keyDownOnItemsList('L')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(0)),
      )

      jest.advanceTimersByTime(Dropdown.charKeyPressedCleanupTime / 2)
      keyDownOnItemsList('E')

      expect(itemsList).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(2)),
      )
    })
  })

  describe('value', () => {
    it('it takes the value of the controlled prop', () => {
      const value = items[2]
      const { triggerButton, clickOnItemAtIndex } = renderDropdown({ value, defaultOpen: true })

      expect(triggerButton).toHaveTextContent(value)

      clickOnItemAtIndex(0)

      expect(triggerButton).toHaveTextContent(value)
    })

    it('it takes the value of the default prop but can be changed', () => {
      const defaultValue = items[2]
      const itemToBeClickedIndex = 1
      const { triggerButton, clickOnItemAtIndex } = renderDropdown({
        defaultValue,
        defaultOpen: true,
      })

      expect(triggerButton).toHaveTextContent(defaultValue)

      clickOnItemAtIndex(itemToBeClickedIndex)

      expect(triggerButton).toHaveTextContent(items[itemToBeClickedIndex])
    })

    it('has onChange called when item is added', () => {
      const itemToClickIndex = 2
      const onChange = jest.fn()
      const { clickOnItemAtIndex } = renderDropdown({ open: true, onChange })

      clickOnItemAtIndex(itemToClickIndex)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemToClickIndex],
          searchQuery: items[itemToClickIndex],
        }),
      )
    })

    it('has onChange called when item is added or removed on multiple', () => {
      // it will actually be the third, since one is already removed from the list due to defaultValue.
      const itemToClickIndex = 2
      const defaultSelectedItemIndex = 1
      const onChange = jest.fn()
      const { clickOnItemAtIndex, keyDownOnSelectedItemAtIndex } = renderDropdown({
        open: true,
        defaultValue: [items[defaultSelectedItemIndex]],
        onChange,
        multiple: true,
      })

      clickOnItemAtIndex(itemToClickIndex - 1)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[defaultSelectedItemIndex], items[itemToClickIndex]],
        }),
      )

      keyDownOnSelectedItemAtIndex(0, 'Delete')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: [items[itemToClickIndex]],
        }),
      )
    })

    it('is set by clicking on item', () => {
      const itemSelectedIndex = 2
      const { triggerButton, clickOnItemAtIndex } = renderDropdown({ defaultOpen: true })

      clickOnItemAtIndex(itemSelectedIndex)

      expect(triggerButton).toHaveTextContent(items[itemSelectedIndex])
    })

    it('is set by using Enter on highlighted item', () => {
      const itemSelectedIndex = 1
      const { triggerButton, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      })

      keyDownOnItemsList('Enter')

      expect(triggerButton).toHaveTextContent(items[itemSelectedIndex])
    })

    it('is set by using Tab on highlighted item', () => {
      const itemSelectedIndex = 3
      const { triggerButton, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      })

      keyDownOnItemsList('Tab')

      expect(triggerButton).toHaveTextContent(items[itemSelectedIndex])
    })

    it('is set by using Shift+Tab on highlighted item', () => {
      const itemSelectedIndex = 2
      const { triggerButton, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      })

      keyDownOnItemsList('Tab', { shiftKey: true })

      expect(triggerButton).toHaveTextContent(items[itemSelectedIndex])
    })

    it('is replaced when another item is selected', () => {
      const defaultSelectedIndex = 0
      const itemSelectedIndex = 2
      const { triggerButton, clickOnItemAtIndex } = renderDropdown({
        defaultOpen: true,
        defaultValue: items[defaultSelectedIndex],
      })

      expect(triggerButton).toHaveTextContent(items[defaultSelectedIndex])

      clickOnItemAtIndex(itemSelectedIndex)

      expect(triggerButton).toHaveTextContent(items[itemSelectedIndex])
    })

    it('has an array of items if more items are selected and the multiple prop is supplied', () => {
      const { getSelectedItems, getSelectedItemAtIndex } = renderDropdown({
        multiple: true,
        defaultValue: [items[0], items[1]],
      })

      expect(getSelectedItems()).toHaveLength(2)
      expect(getSelectedItemAtIndex(0)).toHaveTextContent(items[0])
      expect(getSelectedItemAtIndex(1)).toHaveTextContent(items[1])
    })

    it('emoves last item on backspace when query is emtpy', () => {
      const { getSelectedItems, getSelectedItemAtIndex, keyDownOnSearchInput } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      })

      keyDownOnSearchInput('Backspace')

      expect(getSelectedItems()).toHaveLength(1)
      expect(getSelectedItemAtIndex(0)).toHaveTextContent(items[0])
    })

    it('does not rempve last item on backspace when query is not empty', () => {
      const { getSelectedItems, keyDownOnSearchInput, searchInput } = renderDropdown({
        multiple: true,
        search: true,
        defaultSearchQuery: 'bla',
        defaultValue: [items[0], items[1]],
      })

      searchInput.setSelectionRange(1, 2)
      keyDownOnSearchInput('Backspace')

      expect(getSelectedItems()).toHaveLength(2)
    })

    it('removes last item on backspace when selection range is 0, 0', () => {
      const {
        getSelectedItems,
        getSelectedItemAtIndex,
        keyDownOnSearchInput,
        searchInput,
      } = renderDropdown({
        multiple: true,
        search: true,
        defaultSearchQuery: 'bla',
        defaultValue: [items[0], items[1]],
      })

      searchInput.setSelectionRange(0, 0)
      keyDownOnSearchInput('Backspace')

      expect(getSelectedItems()).toHaveLength(1)
      expect(getSelectedItemAtIndex(0)).toHaveTextContent(items[0])
    })

    it('does not rempve last item on backspace when selection range is 0, (y>0)', () => {
      const { getSelectedItems, keyDownOnSearchInput, searchInput } = renderDropdown({
        multiple: true,
        search: true,
        defaultSearchQuery: 'bla',
        defaultValue: [items[0], items[1]],
      })

      searchInput.setSelectionRange(0, 1)
      keyDownOnSearchInput('Backspace')

      expect(getSelectedItems()).toHaveLength(2)
    })

    it('has the item removed if it receives delete key down', () => {
      const {
        getSelectedItems,
        getSelectedItemAtIndex,
        keyDownOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      })

      keyDownOnSelectedItemAtIndex(0, 'Delete')

      expect(getSelectedItems()).toHaveLength(1)
      expect(getSelectedItemAtIndex(0)).toHaveTextContent(items[1])
    })

    it('has the item removed if it receives click on remove icon', () => {
      const { getSelectedItems, getSelectedItemAtIndex, wrapper } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      })

      findIntrinsicElement(wrapper, `.${DropdownSelectedItem.slotClassNames.icon}`)
        .at(0)
        .simulate('click')

      expect(getSelectedItems()).toHaveLength(1)
      expect(getSelectedItemAtIndex(0)).toHaveTextContent(items[1])
    })
  })

  describe('getA11ySelectionMessage', () => {
    afterEach(() => {
      jest.runAllTimers()
    })

    it('creates message container element', () => {
      const { getA11yMessageContainer } = renderDropdown({ getA11ySelectionMessage: {} })

      expect(getA11yMessageContainer()).toMatchInlineSnapshot(`
        <div
          aria-live="polite"
          aria-relevant="additions text"
          role="status"
          style="border: 0px; height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px;"
        />
      `)
    })

    it('has the onAdd message inserted and cleared after an item has been added to selection', () => {
      const itemToBeClickedIndex = 1
      const { getA11yMessageContainer, clickOnItemAtIndex } = renderDropdown({
        defaultOpen: true,
        getA11ySelectionMessage: { onAdd: item => `${item} has been added` },
      })

      clickOnItemAtIndex(itemToBeClickedIndex)

      expect(getA11yMessageContainer()).toHaveTextContent(
        `${items[itemToBeClickedIndex]} has been added`,
      )

      jest.runAllTimers()

      expect(getA11yMessageContainer()).toHaveTextContent('')
    })

    it('has the onRemove message inserted and cleared after an item has been removed from selection', () => {
      const itemSelectedByDefaultIndex = 2
      const { getA11yMessageContainer, keyDownOnSelectedItemAtIndex } = renderDropdown({
        defaultOpen: true,
        multiple: true,
        defaultValue: [items[itemSelectedByDefaultIndex]],
        getA11ySelectionMessage: { onRemove: item => `${item} has been removed` },
      })

      keyDownOnSelectedItemAtIndex(0, 'Delete')

      expect(getA11yMessageContainer()).toHaveTextContent(
        `${items[itemSelectedByDefaultIndex]} has been removed`,
      )

      jest.runAllTimers()

      expect(getA11yMessageContainer()).toHaveTextContent('')
    })
  })

  describe('searchQuery', () => {
    it('it takes the value of the controlled prop', () => {
      const searchQuery = "can't touch this"
      const { changeSearchInput, searchInput } = renderDropdown({ searchQuery, search: true })

      expect(searchInput).toHaveValue(searchQuery)

      changeSearchInput('but I can try!')

      expect(searchInput).toHaveValue(searchQuery)
    })

    it('it takes the value of the default prop but can be changed', () => {
      const defaultSearchQuery = "maybe you can't touch this"
      const finalSearchQuery = 'you underestimate my power'
      const { changeSearchInput, searchInput } = renderDropdown({
        defaultSearchQuery,
        search: true,
      })

      expect(searchInput).toHaveValue(defaultSearchQuery)

      changeSearchInput(finalSearchQuery)

      expect(searchInput).toHaveValue(finalSearchQuery)
    })

    it("updates component's state on props updates", () => {
      const newSearchQueryProp = 'bar'
      const { wrapper, searchInput } = renderDropdown({
        searchQuery: 'foo',
        search: true,
      })

      wrapper.setProps({ searchQuery: newSearchQueryProp })
      expect(searchInput).toHaveValue(newSearchQueryProp)
    })

    it('closes dropdown when changed to empty string', () => {
      const { getItems, changeSearchInput } = renderDropdown({
        defaultSearchQuery: 'foo',
        defaultOpen: true,
        search: true,
      })

      changeSearchInput('')

      expect(getItems()).toHaveLength(0)
    })

    it('is the string equivalent of selected item in single search', () => {
      const itemSelectedIndex = 2
      const itemsAsObjects = items.map(item => ({ value: item, key: item }))
      const { searchInput, clickOnItemAtIndex } = renderDropdown({
        search: true,
        defaultOpen: true,
        items: itemsAsObjects,
        itemToString: (itemObject: { value: string }) => itemObject.value,
      })

      clickOnItemAtIndex(itemSelectedIndex)

      expect(searchInput).toHaveValue(itemsAsObjects[itemSelectedIndex].value)
    })

    it('is set to empty by hitting Escape in search input', () => {
      const { keyDownOnSearchInput, searchInput } = renderDropdown({
        defaultSearchQuery: 'foo',
        search: true,
      })

      keyDownOnSearchInput('Escape')

      expect(searchInput).toHaveValue('')
    })

    it('is set to empty when item is selected in multiple search', () => {
      const { clickOnItemAtIndex, searchInput, getSelectedItems } = renderDropdown({
        search: true,
        multiple: true,
        defaultOpen: true,
      })

      clickOnItemAtIndex(2)

      expect(searchInput).toHaveValue('')
      expect(getSelectedItems()).toHaveLength(1)
    })
  })

  describe('activeSelectedIndex', () => {
    it('is set on active item click', () => {
      const { getSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown({
        multiple: true,
        value: [items[2]],
      })

      clickOnSelectedItemAtIndex(0)

      expect(document.activeElement).toBe(getSelectedItemAtIndex(0))
    })

    it('is set as last index on left arrow from the search query', () => {
      const { getSelectedItemAtIndex, keyDownOnSearchInput } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
        search: true,
      })

      keyDownOnSearchInput('ArrowLeft')

      expect(document.activeElement).toBe(getSelectedItemAtIndex(2))
    })

    it('is set as last index on left arrow from the trigger button', () => {
      const { getSelectedItemAtIndex, keyDownOnTriggerButton } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
      })

      keyDownOnTriggerButton('ArrowLeft')

      expect(document.activeElement).toBe(getSelectedItemAtIndex(2))
    })

    it('is updated on arrow navigation after being set by click', () => {
      const {
        getSelectedItemAtIndex,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
      })

      clickOnSelectedItemAtIndex(2)
      keyDownOnSelectedItemAtIndex(2, 'ArrowLeft')

      expect(document.activeElement).toBe(getSelectedItemAtIndex(1))
    })

    it('stays as "0" on left arrow from the first selected item', () => {
      const {
        getSelectedItemAtIndex,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
      })

      clickOnSelectedItemAtIndex(0)
      keyDownOnSelectedItemAtIndex(0, 'ArrowLeft')

      expect(document.activeElement).toBe(getSelectedItemAtIndex(0))
    })

    it('gets unset on right arrow from the last selected item and moves focus to trigger button', () => {
      const {
        triggerButton,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
      })

      clickOnSelectedItemAtIndex(2)
      keyDownOnSelectedItemAtIndex(2, 'ArrowRight')

      expect(document.activeElement).toBe(triggerButton)
    })

    it('gets unset on the removal of selected item and moves focus to trigger button', () => {
      const {
        triggerButton,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
      })

      clickOnSelectedItemAtIndex(2)
      keyDownOnSelectedItemAtIndex(2, 'Delete')

      expect(document.activeElement).toBe(triggerButton)
    })

    it('gets unset on right arrow from the last selected item and moves focus to search input', () => {
      const {
        searchInput,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
        search: true,
      })

      clickOnSelectedItemAtIndex(2)
      keyDownOnSelectedItemAtIndex(2, 'ArrowRight')

      expect(document.activeElement).toBe(searchInput)
    })

    it('gets unset on the removal of selected item and moves focus to search input', () => {
      const {
        searchInput,
        keyDownOnSelectedItemAtIndex,
        clickOnSelectedItemAtIndex,
      } = renderDropdown({
        multiple: true,
        value: [items[0], items[1], items[2]],
        search: true,
      })

      clickOnSelectedItemAtIndex(2)
      keyDownOnSelectedItemAtIndex(2, 'Delete')

      expect(document.activeElement).toBe(searchInput)
    })
  })

  describe('focused', () => {
    it('is "true" when focus is on trigger button', () => {
      const { wrapper, focusTriggerButton } = renderDropdown()

      focusTriggerButton()

      expect(wrapper.find(Dropdown).state('focused')).toBe(true)
    })

    it('is "true" when focus is on search input', () => {
      const { wrapper, focusSearchInput } = renderDropdown({ search: true })

      focusSearchInput()

      expect(wrapper.find(Dropdown).state('focused')).toBe(true)
    })

    it('is "true" when focus is on the list', () => {
      const { wrapper, focusItemsList } = renderDropdown({ open: true })

      focusItemsList()

      expect(wrapper.find(Dropdown).state('focused')).toBe(true)
    })
  })

  describe('toggleIndicator', () => {
    it('moves focus to list at click', () => {
      const { clickOnToggleIndicator, itemsList } = renderDropdown()

      clickOnToggleIndicator()

      expect(document.activeElement).toBe(itemsList)
    })

    it('moves focus to input in search mode', () => {
      const { clickOnToggleIndicator, searchInput } = renderDropdown({ search: true })

      clickOnToggleIndicator()

      expect(document.activeElement).toBe(searchInput)
    })
  })

  describe('moveFocusOnTab', () => {
    // only way to check Tab is prevented in unit tests.
    const preventDefault = jest.fn()

    afterEach(() => {
      preventDefault.mockReset()
    })

    it('keeps focus on trigger button when not passed', () => {
      const { keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
      })

      keyDownOnItemsList('Tab', { preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('keeps focus on input when not passed', () => {
      const { keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        search: true,
      })

      keyDownOnSearchInput('Tab', { preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('allows focus to move to next item from search input when passed', () => {
      const { keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        search: true,
        moveFocusOnTab: true,
      })

      keyDownOnSearchInput('Tab', { preventDefault })

      expect(preventDefault).not.toBeCalled()
    })

    it('allows focus to move to next item from items list when passed', () => {
      const { keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        moveFocusOnTab: true,
      })

      keyDownOnItemsList('Tab', { preventDefault })

      expect(preventDefault).not.toBeCalled()
    })
  })

  describe('multiple', () => {
    it('can be switched to "multiple"', () => {
      const { wrapper, getSelectedItems } = renderDropdown({ value: items[0] })

      expect(getSelectedItems()).toHaveLength(0)

      wrapper.setProps({ multiple: true })
      expect(getSelectedItems()).toHaveLength(1)
    })

    it('does not contain duplicates after an item is selected', () => {
      const { getSelectedItems, getItems, clickOnItemAtIndex } = renderDropdown({
        multiple: true,
        open: true,
      })

      clickOnItemAtIndex(0)

      expect(getSelectedItems()).toHaveLength(1)
      expect(getItems()).toHaveLength(items.length - 1)

      clickOnItemAtIndex(0)

      expect(getSelectedItems()).toHaveLength(2)
      expect(getItems()).toHaveLength(items.length - 2)
    })

    it('does not contain duplicates when value is set', () => {
      const { getSelectedItems, getItems } = renderDropdown({
        multiple: true,
        open: true,
        value: items[0],
      })

      expect(getSelectedItems()).toHaveLength(1)
      expect(getItems()).toHaveLength(items.length - 1)
    })

    it('contains duplicates by default', () => {
      const items = [{ key: '1', header: 'James Smith' }]
      const value = [{ key: '1', header: 'John Locke' }]

      const { getSelectedItems, getItems } = renderDropdown({
        multiple: true,
        open: true,
        value,
        items,
      })

      expect(getSelectedItems()).toHaveLength(1)
      expect(getItems()).toHaveLength(items.length)
    })

    it('does not contain duplicates when proper itemToValue prop is used', () => {
      const items = [{ id: '1', header: 'James Smith' }]
      const value = [{ id: '1', header: 'John Locke' }]
      const itemToValue = (item: ShorthandValue<DropdownItemProps>): string => {
        if (!item || !React.isValidElement(item)) {
          return ''
        }
        return (item as any).id
      }

      const { getSelectedItems, getItems } = renderDropdown({
        multiple: true,
        open: true,
        value,
        items,
        itemToValue,
      })

      expect(getSelectedItems()).toHaveLength(1)
      expect(getItems()).toHaveLength(items.length - 1)
    })
  })

  describe('items', () => {
    it('have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const mockedEvent = { stopPropagation }
      const items = [{ header: 'Venom', onClick }]
      const { clickOnItemAtIndex } = renderDropdown({ items, defaultOpen: true })

      clickOnItemAtIndex(0, mockedEvent)

      expect(onClick).toBeCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      )
      expect(stopPropagation).toBeCalledTimes(1)
    })

    it('when selected have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const mockedEvent = { stopPropagation }
      const items = [{ header: 'Venom', onClick }]
      const { clickOnSelectedItemAtIndex } = renderDropdown({
        items,
        multiple: true,
        value: items,
        defaultOpen: true,
      })

      clickOnSelectedItemAtIndex(0, mockedEvent)

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

  describe('renderSelectedItem', () => {
    it('is called in multiple selection', () => {
      const renderSelectedItem = jest.fn()
      const value = [items[0], items[1]]

      renderDropdown({ renderSelectedItem, multiple: true, value })

      expect(renderSelectedItem).toBeCalledTimes(value.length)
    })
  })
})
