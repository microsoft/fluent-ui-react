import * as React from 'react'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ListItem from 'src/components/List/ListItem'
import { selectableListItemBehavior } from 'src/lib/accessibility'

describe('ListItem', () => {
  isConformant(ListItem)
  handlesAccessibility(ListItem, { defaultRootRole: 'listitem' })

  describe('selectable list handleClick', () => {
    test('is executed when Enter is pressed', () => {
      const onClick = jest.fn()
      const listItem = mountWithProvider(
        <ListItem accessibility={selectableListItemBehavior} onClick={onClick} />,
      ).find('ListItem')
      listItem.simulate('keydown', { keyCode: 13 })
      expect(onClick).toHaveBeenCalled()
    })

    test('is executed when Spacebar is pressed', () => {
      const onClick = jest.fn()
      const listItem = mountWithProvider(
        <ListItem accessibility={selectableListItemBehavior} onClick={onClick} />,
      ).find('ListItem')
      listItem.simulate('keydown', { keyCode: 32 })
      expect(onClick).toHaveBeenCalled()
    })
  })
})
