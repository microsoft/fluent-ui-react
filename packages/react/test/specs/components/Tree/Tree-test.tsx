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
    it('should contain index of item open at click', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)
      const tree = wrapper.find(Tree).at(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      expect(tree.state('activeIndex')).toEqual([0])

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(3) // title 2
        .simulate('click')
      expect(tree.state('activeIndex')).toEqual([0, 1])
    })

    it('should have index of item removed when closed at click', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0, 1]} />)
      const tree = wrapper.find(Tree).at(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      expect(tree.state('activeIndex')).toEqual([1])
    })

    it('should contain only one index at a time if exclusive', () => {
      const wrapper = mountWithProvider(<Tree items={items} exclusive />)
      const tree = wrapper.find(Tree).at(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      expect(tree.state('activeIndex')).toEqual(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(3) // title 2
        .simulate('click')
      expect(tree.state('activeIndex')).toEqual(1)
    })

    it('should contain index of item open by ArrowRight', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)
      const tree = wrapper.find(Tree).at(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowRight })
      expect(tree.state('activeIndex')).toEqual([0])
    })

    it('should have index of item removed if closed by ArrowLeft', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0, 1]} />)
      const tree = wrapper.find(Tree).at(0)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowLeft })
      expect(tree.state('activeIndex')).toEqual([1])
    })
  })
})
