import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

import Dropdown, { DropdownProps } from 'src/components/Dropdown/Dropdown'
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput'
import DropdownSelectedItem from 'src/components/Dropdown/DropdownSelectedItem'
import { isConformant } from 'test/specs/commonTests'
import { findIntrinsicElement, mountWithProvider } from 'test/utils'
import { ReactWrapper, CommonWrapper } from 'enzyme'
import { DropdownItemProps } from 'src/components/Dropdown/DropdownItem'
import { ShorthandValue } from 'src/types'

jest.dontMock('keyboard-key')
jest.useFakeTimers()

const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5']

const getTriggerButtonWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.triggerButton}`)

const getToggleIndicatorWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.toggleIndicator}`)

const getSearchInputWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${DropdownSearchInput.slotClassNames.input}`)

const getItemsListWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.itemsList}`)

const getItemAtIndexWrapper = (wrapper: ReactWrapper, index: number = 0): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.item}`).at(index)

const getSelectedItemAtIndexWrapper = (wrapper: ReactWrapper, index: number = 0): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`).at(index)

const getSelectedItemHeaderAtIndexWrapper = (
  wrapper: ReactWrapper,
  index: number = 0,
): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${DropdownSelectedItem.slotClassNames.header}`).at(index)

const renderDropdown = (props: DropdownProps = {}) => {
  const wrapper = mountWithProvider(<Dropdown items={items} {...props} />)
  const triggerButtonWrapper = findIntrinsicElement(
    wrapper,
    `.${Dropdown.slotClassNames.triggerButton}`,
  )
  const toggleIndicatorWrapper = findIntrinsicElement(
    wrapper,
    `.${Dropdown.slotClassNames.toggleIndicator}`,
  )
  const searchInputWrapper = findIntrinsicElement(
    wrapper,
    `.${DropdownSearchInput.slotClassNames.input}`,
  )
  const itemsListWrapper = findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.itemsList}`)
  const getItemsWrapper = () => findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.item}`)
  const getSelectedItemsWrapper = () =>
    findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`)
  const getSelectedItemWrapperAtIndex = index => getSelectedItemsWrapper().at(index)
  const getItemWrapperAtIndex = index => getItemsWrapper().at(index)

  return {
    wrapper,
    triggerButton: triggerButtonWrapper.length && triggerButtonWrapper.getDOMNode(),
    toggleIndicator: toggleIndicatorWrapper.length && toggleIndicatorWrapper.getDOMNode(),
    itemsList: itemsListWrapper.getDOMNode(),
    searchInput: searchInputWrapper.length && searchInputWrapper.getDOMNode<HTMLInputElement>(),
    getA11yMessageContainer: () => findIntrinsicElement(wrapper, '[role="status"]').getDOMNode(),
    getItems: () => getItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getSelectedItems: () => getSelectedItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getItemAtIndex: index => getItemWrapperAtIndex(index).getDOMNode(),
    getSelectedItemAtIndex: index => getSelectedItemWrapperAtIndex(index).getDOMNode(),
    mouseOverItemAtIndex: index => getItemWrapperAtIndex(index).simulate('mousemove'),
    changeSearchInput: value => {
      searchInputWrapper.simulate('change', { target: { value } })
    },
    clickOnTriggerButton: () => {
      triggerButtonWrapper.simulate('click')
    },
    clickOnToggleIndicator: () => {
      toggleIndicatorWrapper.simulate('click')
    },
    clickOnSearchInput: () => {
      searchInputWrapper.simulate('click')
    },
    clickOnItemAtIndex: index => {
      getItemWrapperAtIndex(index).simulate('click', {
        nativeEvent: { stopImmediatePropagation: jest.fn() },
      })
    },
    clickOnSelectedItemAtIndex: index => {
      getSelectedItemWrapperAtIndex(index).simulate('click')
    },
    keyDownOnSearchInput: (key: string, optional?: Object) =>
      searchInputWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnItemsList: (key: string, optional?: Object) =>
      itemsListWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnTriggerButton: (key: string, optional?: Object) =>
      triggerButtonWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnSelectedItemAtIndex: (index: number, key: string, optional?: Object) => {
      getSelectedItemWrapperAtIndex(index).simulate('keydown', { key, ...optional })
    },
  }
}

const getItemIdRegexByIndex = index => new RegExp(`downshift-\\d+-item-${index}`)

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
      const { triggerButton, wrapper } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
      })

      findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.clearIndicator}`).simulate('click')

      expect(triggerButton).toHaveTextContent('')
    })

    it('calls onChange on Icon click with an `empty` value', () => {
      const onChange = jest.fn()
      const { wrapper } = renderDropdown({
        onChange,
        defaultValue: items[0],
        clearable: true,
      })

      findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.clearIndicator}`).simulate('click')

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
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const dropdown = wrapper.find(Dropdown)

      triggerButton.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })

    it('is "true" when focus is on search input', () => {
      const wrapper = mountWithProvider(<Dropdown search items={items} />)
      const searchInput = getSearchInputWrapper(wrapper)
      const dropdown = wrapper.find(Dropdown)

      searchInput.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })

    it('is "true" when focus is on the list', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} open />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)

      itemsList.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })
  })

  describe('toggleIndicator', () => {
    it('closes the open menu on click', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

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

    it('moves focus to list in selection mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(getItemsListWrapper(wrapper).getDOMNode())
    })

    it('moves focus to input in search mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} search />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(getSearchInputWrapper(wrapper).getDOMNode())
    })
  })

  describe('moveFocusOnTab', () => {
    const preventDefault = jest.fn()

    afterEach(() => {
      preventDefault.mockReset()
    })

    it('keeps focus on trigger button when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('keeps focus on input when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')
      const searchInput = getSearchInputWrapper(wrapper)
      searchInput
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('allows focus to move to next item when passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} moveFocusOnTab />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).not.toBeCalled()
    })
  })

  describe('multiple', () => {
    it('can be switched to "multiple"', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} value={items[0]} />)

      expect(
        findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`),
      ).toHaveLength(0)

      wrapper.setProps({ multiple: true } as any)
      expect(
        findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`),
      ).toHaveLength(1)
    })

    it('does not contain duplicities after an item is selected', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
    })

    it('does not contain duplicities when value is set', () => {
      const items = ['James Smith']
      const value = ['James Smith']
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={value} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
    })

    it('contains "duplicates" by default', () => {
      const items = [{ key: '1', header: 'James Smith' }]
      const value = [{ key: '1', header: 'John Locke' }]

      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={value} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(true)
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

      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} value={value} itemToValue={itemToValue} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)
      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
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
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
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
      const selectedItemHeaderAtIndex0 = getSelectedItemHeaderAtIndexWrapper(wrapper, 0)

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

  describe('renderSelectedItem', () => {
    it('calls renderSelectedItem in multiple selection', () => {
      const renderSelectedItem = jest.fn((selectedItem, props) => null)
      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} renderSelectedItem={renderSelectedItem} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })
      triggerButton.simulate('click')
      const secondItem = getItemAtIndexWrapper(wrapper, 1)
      secondItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })

      expect(renderSelectedItem).toBeCalled()
    })
  })
})
