import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'
import Tree from 'src/components/Tree/Tree'
import TreeTitle from 'src/components/Tree/TreeTitle'

const items = [
  {
    key: '1',
    title: '1',
    items: [
      {
        key: '11',
        title: '11',
      },
      {
        key: '12',
        title: '12',
        items: [
          {
            key: '121',
            title: '121',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '2',
    items: [
      {
        key: '21',
        title: '21',
        items: [
          {
            key: '221',
            title: '221',
          },
        ],
      },
      {
        key: '22',
        title: '22',
      },
    ],
  },
  {
    key: '3',
    title: '3',
  },
]

describe('Tree', () => {
  isConformant(Tree)

  describe('activeIndex', () => {
    it('should have all TreeItems with a subtree open on asterisk key', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)
      const tree = wrapper.find(Tree).at(0)
      const firstTreeTitle = wrapper.find(`.${TreeTitle.className}`).at(0)

      firstTreeTitle.simulate('keydown', { keyCode: keyboardKey['*'] })
      expect(tree.state('activeIndex')).toEqual([0, 1])
    })

    it('should expand subtrees only on current level', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)
      const firstTreeTitle = wrapper.find(`.${TreeTitle.className}`).at(0)

      firstTreeTitle.simulate('keydown', { keyCode: keyboardKey['*'] })
      const tree = wrapper.find(Tree)
      expect(tree.length).toBe(3) // Parent tree + its 2 subtrees (1, 2). Did not expand the other 2 subtrees (12, 21).
    })
  })
})
