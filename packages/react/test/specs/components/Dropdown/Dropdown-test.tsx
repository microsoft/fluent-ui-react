import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import Dropdown from 'src/components/Dropdown/Dropdown'
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

jest.dontMock('keyboard-key')

describe('Dropdown', () => {
  const items = ['item1', 'item2', 'item3']
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

    it('has the provided prop value when opened by click', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper.find({ className: Dropdown.slotClassNames.triggerButton }).simulate('click')
      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex,
          open: true,
        }),
      )
    })

    it('has the (provided prop value + 1) when opened by ArrowDown', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper
        .find({ className: Dropdown.slotClassNames.triggerButton })
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

    it('has the provided (prop value - 1) when opened by ArrowUp', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper
        .find({ className: Dropdown.slotClassNames.triggerButton })
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

    it('is 0 when the provided prop value is last item index and opened by ArrowDown', () => {
      const highlightedIndex = items.length - 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper
        .find({ className: Dropdown.slotClassNames.triggerButton })
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

    it('is last item index when the provided prop value is 0 and opened by ArrowUp', () => {
      const highlightedIndex = 0
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )

      wrapper
        .find({ className: Dropdown.slotClassNames.triggerButton })
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

      wrapper.find({ className: Dropdown.slotClassNames.triggerButton }).simulate('click')
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
        .find({ className: Dropdown.slotClassNames.triggerButton })
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
      const triggerButton = wrapper.find({ className: Dropdown.slotClassNames.triggerButton })

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
      const triggerButton = wrapper.find({ className: Dropdown.slotClassNames.triggerButton })

      triggerButton
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
