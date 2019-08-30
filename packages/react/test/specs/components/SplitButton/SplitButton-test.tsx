import * as React from 'react'

import SplitButton from 'src/components/SplitButton/SplitButton'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'
import Menu from 'src/components/Menu/Menu'
import { ReactWrapper, CommonWrapper } from 'enzyme'
import MenuButton from 'src/components/MenuButton/MenuButton'

const mockMenu = { items: ['1', '2', '3'] }

const getToggleButton = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper
    .find(`.${SplitButton.slotClassNames.toggleButton}`)
    .filterWhere(n => typeof n.type() === 'string')
const getMainButton = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${MenuButton.className}`).filterWhere(n => typeof n.type() === 'string')
const getMenuItems = (wrapper: ReactWrapper): CommonWrapper =>
  wrapper.find(`.${Menu.slotClassNames.item}`).filterWhere(n => typeof n.type() === 'string')

describe('SplitButton', () => {
  isConformant(SplitButton)

  describe('open', () => {
    test('is toggled between true and false on toggle button click', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button={'test'} />)
      const toggleButton = getToggleButton(wrapper)

      toggleButton.simulate('click')
      expect(getMenuItems(wrapper).length).toBe(mockMenu.items.length)

      toggleButton.simulate('click')
      expect(getMenuItems(wrapper).length).toBe(0)
    })

    test('is false when clicking menu item', () => {
      const wrapper = mountWithProvider(
        <SplitButton menu={mockMenu} button={'test'} defaultOpen={true} />,
      )

      getMenuItems(wrapper)
        .at(0)
        .simulate('click')
      expect(getMenuItems(wrapper).length).toBe(0)
    })
  })

  test('onMenuItemClick', () => {
    const onMenuItemClick = jest.fn()
    const wrapper = mountWithProvider(
      <SplitButton
        menu={mockMenu}
        button={'test'}
        onMenuItemClick={onMenuItemClick}
        defaultOpen={true}
      />,
    )

    getMenuItems(wrapper)
      .at(0)
      .simulate('click')
    expect(onMenuItemClick).toHaveBeenCalledTimes(1)
  })

  test('onMainButtonClick', () => {
    const onMainButtonClick = jest.fn()
    const wrapper = mountWithProvider(
      <SplitButton menu={mockMenu} button={'test'} onMainButtonClick={onMainButtonClick} />,
    )

    getMainButton(wrapper).simulate('click')
    expect(onMainButtonClick).toHaveBeenCalledTimes(1)
  })
})
