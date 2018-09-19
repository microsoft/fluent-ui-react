import * as React from 'react'

import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import { mountWithProvider, getTestingRenderedComponent } from 'test/utils'

import RadioGroup, { RadioGroupItem } from 'src/components/RadioGroup'

const radioGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(RadioGroup)

describe('RadioGroup', () => {
  describe('isConformant', () => {
    isConformant(RadioGroup)
  })

  describe('accessibility', () => {
    handlesAccessibility(RadioGroup, {
      defaultRootRole: 'radiogroup',
    })
  })

  describe('implementsCollectionShorthandProp', () => {
    radioGroupImplementsCollectionShorthandProp('items', RadioGroupItem, {
      mapsValueToProp: 'content',
      skipArrayOfStrings: true,
    })
  })

  const getItems = () => [
    {
      name: 'test-name',
      key: 'test-key1',
      label: 'test-label1',
      value: 'test-value1',
      'data-foo': 'something',
      onClick: jest.fn(),
    },
    {
      name: 'test-name',
      key: 'test-key2',
      label: 'test-label2',
      value: 'test-value2',
      'data-foo': 'something',
    },
    {
      name: 'test-name',
      key: 'test-key3',
      label: 'test-label3',
      value: 'test-value3',
      'data-foo': 'something',
    },
  ]

  describe('items', () => {
    it('renders children', () => {
      const items = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem')

      expect(items.length).toBe(3)
      expect(items.first().props().label).toBe('test-label1')
      expect(items.last().props().label).toBe('test-label3')
    })

    // it('calls onClick handler for item', () => {
    //   const items = getItems()
    //   const radioGroupItems = mountWithProvider(<RadioGroup items={items} />).find('RadioGroupItem')

    //   radioGroupItems
    //     .first()
    //     .find('div')
    //     .first()
    //     .simulate('click')
    //   expect(items[0].onClick).toHaveBeenCalled()
    // })

    it('passes arbitrary props', () => {
      const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find(
        'RadioGroupItem',
      )

      expect(radioGroupItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true)
    })

    // describe('checkedValue', () => {
    //   it('should not be set by default', () => {
    //     const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem')

    //     expect(radioGroupItems.everyWhere(item => !item.is('[checked="true"]'))).toBe(true)
    //   })

    //   it('should be set when item is clicked', () => {
    //     const wrapper = mountWithProvider(<RadioGroup items={getItems()} />)
    //     const radioGroupItems = wrapper.find('RadioGroupItem')

    //     radioGroupItems
    //       .at(1)
    //       .find('div')
    //       .first()
    //       .simulate('click')

    //     const updatedItems = wrapper.find('RadioGroupItem')

    //     expect(updatedItems.at(0).props().checked).toBe(false)
    //     expect(updatedItems.at(1).props().checked).toBe(true)
    //   })
    // })
  })
})
