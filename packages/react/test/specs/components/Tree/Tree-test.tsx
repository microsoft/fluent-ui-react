import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'
import Tree from 'src/components/Tree/Tree'
import TreeTitle from 'src/components/Tree/TreeTitle'
import { ReactWrapper } from 'enzyme'

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

const checkOpenTitles = (wrapper: ReactWrapper, expected: string[]): void => {
  const titles = wrapper.find(`.${TreeTitle.className}`)
  expect(titles.length).toEqual(expected.length)

  expected.forEach((expectedTitle, index) => {
    expect(titles.at(index).getDOMNode().textContent).toEqual(expectedTitle)
  })
}

describe('Tree', () => {
  isConformant(Tree)

  describe('activeIndex', () => {
    it('should contain index of item open at click', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3'])

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(3) // title 2
        .simulate('click')
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3'])
    })

    it('should have index of item removed when closed at click', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0, 1]} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3'])
    })

    it('should contain only one index at a time if exclusive', () => {
      const wrapper = mountWithProvider(<Tree items={items} exclusive />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('click')
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3'])

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(3) // title 2
        .simulate('click')
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3'])
    })

    it('should contain index of item open by ArrowRight', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowRight })
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '3'])
    })

    it('should have index of item removed if closed by ArrowLeft', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0, 1]} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey.ArrowLeft })
      checkOpenTitles(wrapper, ['1', '2', '21', '22', '3'])
    })

    it('should have all TreeItems with a subtree open on asterisk key', () => {
      const wrapper = mountWithProvider(<Tree items={items} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] })
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3'])
    })

    it('should expand subtrees only on current level on asterisk key', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0]} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(1) // title 11
        .simulate('keydown', { keyCode: keyboardKey['*'] })
      checkOpenTitles(wrapper, ['1', '11', '12', '121', '2', '3'])
    })

    it('should not be changed on asterisk key if all siblings are already expanded', () => {
      const wrapper = mountWithProvider(<Tree items={items} defaultActiveIndex={[0, 1, 2]} />)

      wrapper
        .find(`.${TreeTitle.className}`)
        .at(0) // title 1
        .simulate('keydown', { keyCode: keyboardKey['*'] })
      checkOpenTitles(wrapper, ['1', '11', '12', '2', '21', '22', '3'])
    })
  })
})
