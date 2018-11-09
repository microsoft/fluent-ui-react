import * as React from 'react'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ListItem from 'src/components/List/ListItem'

describe('ListItem', () => {
  isConformant(ListItem)
  handlesAccessibility(ListItem, { defaultRootRole: 'listitem' })

  describe('handleClick', () => {
    test('is executed when Enter is pressed', () => {
      const onClick = jest.fn()
      const listItem = mountWithProvider(<ListItem onClick={onClick} />).find('ListItem')
      listItem.simulate('keydown', { keyCode: 13 })
      expect(onClick).not.toHaveBeenCalled()
    })

    test('is executed when Spacebar is pressed', () => {
      const onClick = jest.fn()
      const listItem = mountWithProvider(<ListItem onClick={onClick} />).find('ListItem')
      listItem.simulate('keydown', { keyCode: 32 })
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
