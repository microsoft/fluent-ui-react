import * as faker from 'faker'
import * as React from 'react'

import Dropdown from 'src/components/Dropdown/Dropdown'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

describe('Dropdown', () => {
  isConformant(Dropdown, { hasAccessibilityProp: false })

  describe('clearable', () => {
    it('calls onChange on Icon click with an `empty` value', () => {
      const onSelectedChange = jest.fn()
      const options = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()]
      const wrapper = mountWithProvider(
        <Dropdown
          clearable
          onSelectedChange={onSelectedChange}
          options={options}
          value={options[0]}
        />,
      )

      wrapper.find({ className: Dropdown.slotClassNames.clearIndicator }).simulate('click')
      expect(onSelectedChange).toBeCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({
          activeSelectedIndex: undefined,
          defaultHighlightedIndex: null,
          searchQuery: undefined,
          value: null,
        }),
      )
    })
  })

  describe('getA11ySelectionMessage', () => {
    it('creates message container element', () => {
      mountWithProvider(<Dropdown options={[]} getA11ySelectionMessage={{}} />)
      expect(document.querySelector(`#${Dropdown.a11ySelectionMessageContainerId}`)).toBeTruthy()
    })
  })
})
