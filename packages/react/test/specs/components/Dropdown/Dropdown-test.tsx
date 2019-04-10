import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import Dropdown from 'src/components/Dropdown/Dropdown'
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

jest.dontMock('keyboard-key')

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

  describe('highlightedIndex', () => {
    const onOpenChange = jest.fn()

    afterEach(() => {
      onOpenChange.mockReset()
    })

    it('is null when opened by click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it.skip('is null when opened by Enter', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is null when opened by Space', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.Space, key: 'Space' })
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

      wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`).simulate('click')
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: defaultHighlightedIndex,
          open: true,
        }),
      )
    })

    it('is null on second and subsequent open even though defaultHighlightedIndex prop is passed', () => {
      const wrapper = mountWithProvider(
        <Dropdown defaultHighlightedIndex={1} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('click')
        .simulate('click')
        .simulate('click')
      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenCalledWith(
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
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

      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('click')
        .simulate('click')
        .simulate('click')
      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenCalledWith(
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
      expect(onSearchQueryChange).toHaveBeenCalledWith(
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
      expect(onSearchQueryChange).toHaveBeenCalledWith(
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenCalledWith(
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenCalledWith(
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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      wrapper
        .find(`button.${Dropdown.slotClassNames.triggerButton}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })
  })

  describe('value', () => {
    it('is set by clicking on item', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(itemSelectedIndex)
        .simulate('click')

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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })

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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab' })

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

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', shiftKey: true })

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is the coorect item when navigating with arrow down key', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click') // open
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' }) // should be index 0
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' }) // should be index 1
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[1],
        }),
      )
    })

    it('is the correct item when navigating with arrow up key', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click') // open
      wrapper
        .find(`ul.${Dropdown.slotClassNames.itemsList}`)
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // should be index 0
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // should be index 1
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[items.length - 2],
        }),
      )
    })

    it('is replaced when another item is selected', () => {
      const itemSelectedIndex = 3
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(1)
        .simulate('click')
      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(itemSelectedIndex)
        .simulate('click')

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
        }),
      )
    })

    it('has multiple items at multiple selections if the multiple prop is supplied', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} multiple items={items} />,
      )
      const indexesOfItemsSelected = [1, 3]

      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(indexesOfItemsSelected[0])
        .simulate('click')
      wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(indexesOfItemsSelected[1])
        .simulate('click')

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[indexesOfItemsSelected[0]], items[indexesOfItemsSelected[1] + 1]],
        }),
      )
    })
  })

  describe('searchQuery', () => {
    it('is the string equivalent of selected item in single search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search items={items} />,
      )

      wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(itemSelectedIndex)
        .simulate('click')

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
          searchQuery: items[itemSelectedIndex],
        }),
      )
    })

    it('is set to empty when item is selected in multiple search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search multiple items={items} />,
      )

      wrapper.find(`span.${Dropdown.slotClassNames.toggleIndicator}`).simulate('click')
      wrapper
        .find(`li.${Dropdown.slotClassNames.item}`)
        .at(itemSelectedIndex)
        .simulate('click')

      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[itemSelectedIndex]],
          searchQuery: '',
        }),
      )
    })
  })

  describe('getA11ySelectionMessage', () => {
    it('creates message container element', () => {
      mountWithProvider(<Dropdown options={[]} getA11ySelectionMessage={{}} />)
      expect(
        document.querySelector(
          `[role="status"][aria-live="polite"][aria-relevant="additions text"]`,
        ),
      ).toBeTruthy()
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
  })
})
