import * as React from 'react'

import {
  isConformant,
  handlesAccessibility,
  htmlIsAccessibilityCompliant,
} from 'test/specs/commonTests'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import { mountWithProvider } from 'test/utils'

import RadioGroup from 'src/components/RadioGroup/RadioGroup'
import RadioGroupItem from 'src/components/RadioGroup/RadioGroupItem'

const radioGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(RadioGroup)

const getShorthandItems = (props?: { disabledItem?: number }) => [
  {
    name: 'test-name',
    key: 'test-key1',
    label: 'test-label1',
    value: 'test-value1',
    'data-foo': 'something',
    onClick: jest.fn(),
    disabled: props && props.disabledItem === 0,
  },
  {
    name: 'test-name',
    key: 'test-key2',
    label: 'test-label2',
    value: 'test-value2',
    'data-foo': 'something',
    disabled: props && props.disabledItem === 1,
  },
  {
    name: 'test-name',
    key: 'test-key3',
    label: 'test-label3',
    value: 'test-value3',
    'data-foo': 'something',
    disabled: props && props.disabledItem === 2,
  },
]

describe('RadioGroup', () => {
  isConformant(RadioGroup, 'RadioGroup')

  describe('accessibility', () => {
    handlesAccessibility(RadioGroup, {
      defaultRootRole: 'radiogroup',
    })

    test('compliance', async () =>
      await htmlIsAccessibilityCompliant(<RadioGroup items={getShorthandItems()} />))
  })

  describe('implementsCollectionShorthandProp', () => {
    radioGroupImplementsCollectionShorthandProp('items', RadioGroupItem, {
      mapsValueToProp: 'content',
      skipArrayOfStrings: true,
    })
  })

  const itemsTest = (getItems: Function, isShorthandApiTest: boolean = true) => {
    it('renders children', () => {
      const items = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem')

      expect(items.length).toBe(3)
      expect(items.first().props().label).toBe('test-label1')
      expect(items.last().props().label).toBe('test-label3')
    })

    it('calls onClick handler for item', () => {
      const items = getItems()
      const radioGroupItems = mountWithProvider(<RadioGroup items={items} />).find('RadioGroupItem')

      radioGroupItems
        .first()
        .find('div')
        .first()
        .simulate('click')

      const onClick = items[0].onClick || items[0].props.onClick
      expect(onClick).toHaveBeenCalled()
    })

    it('passes arbitrary props', () => {
      const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find(
        'RadioGroupItem',
      )

      expect(radioGroupItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true)
    })

    describe('checkedValue', () => {
      it('should not be set by default', () => {
        const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find(
          'RadioGroupItem',
        )

        expect(radioGroupItems.everyWhere(item => !item.is('[checked="true"]'))).toBe(true)
      })
    })

    if (isShorthandApiTest) {
      describe('click event handler', () => {
        it('should set "checked" when item is clicked', () => {
          const checkedValueChanged = jest.fn()
          const wrapper = mountWithProvider(
            <RadioGroup items={getItems()} checkedValueChanged={checkedValueChanged} />,
          )
          const radioGroupItems = wrapper.find('RadioGroupItem')

          radioGroupItems
            .at(1)
            .find('div')
            .first()
            .simulate('click')

          const updatedItems = wrapper.find('RadioGroupItem')

          expect(updatedItems.at(0).props().checked).toBe(false)
          expect(updatedItems.at(1).props().checked).toBe(true)

          expect(checkedValueChanged).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ value: 'test-value2' }),
          )
        })
      })
    }

    it('should not call checkedValueChanged when index did not change', () => {
      const checkedValueChanged = jest.fn()
      const wrapper = mountWithProvider(
        <RadioGroup
          items={getItems()}
          checkedValueChanged={checkedValueChanged}
          checkedValue="test-value2"
        />,
      )
      const radioGroupItems = wrapper.find('RadioGroupItem')

      radioGroupItems
        .at(1)
        .find('div')
        .first()
        .simulate('click')

      expect(checkedValueChanged).not.toHaveBeenCalled()
    })

    if (isShorthandApiTest) {
      it('should not set "checked" when disabled item is clicked', () => {
        const wrapper = mountWithProvider(<RadioGroup items={getItems({ disabledItem: 1 })} />)
        const radioGroupItems = wrapper.find('RadioGroupItem')

        radioGroupItems
          .at(1)
          .find('div')
          .first()
          .simulate('click')

        const updatedItems = wrapper.find('RadioGroupItem')

        expect(updatedItems.at(0).props().checked).toBe(false)
        expect(updatedItems.at(1).props().checked).toBe(false)
      })
    }

    describe('keyDown event handler', () => {
      const testKeyDown = (testName, items, initialValue, keyCode, expectedValue) => {
        it(`keyDown test - ${testName}`, () => {
          const checkedValueChanged = jest.fn()
          const wrapper = mountWithProvider(
            <RadioGroup
              items={items}
              checkedValue={initialValue}
              checkedValueChanged={checkedValueChanged}
            />,
          )

          wrapper
            .find('div')
            .first()
            .simulate('keyDown', { preventDefault() {}, keyCode, which: keyCode })

          expect(checkedValueChanged).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ value: expectedValue }),
          )
        })
      }

      testKeyDown(
        'should check next value when right arrow is pressed',
        getItems(),
        'test-value1',
        39,
        'test-value2',
      )
      testKeyDown(
        'should check previous value when left arrow is pressed',
        getItems(),
        'test-value2',
        37,
        'test-value1',
      )
      testKeyDown(
        'should check first value when right arrow is pressed and last item was checked',
        getItems(),
        'test-value3',
        39,
        'test-value1',
      )
      testKeyDown(
        'should check last value when left arrow is pressed and first item was checked',
        getItems(),
        'test-value1',
        37,
        'test-value3',
      )

      testKeyDown(
        'should skip disabled when right arrow is pressed',
        getItems({ disabledItem: 1 }),
        'test-value1',
        39,
        'test-value3',
      )
      testKeyDown(
        'should skip disabled when left arrow is pressed',
        getItems({ disabledItem: 1 }),
        'test-value3',
        37,
        'test-value1',
      )
    })
  }

  describe('shorthand API for items', () => {
    itemsTest(getShorthandItems)
  })

  describe('children API for items', () => {
    const getChildrenItems = props => {
      return getShorthandItems(props).map(item => {
        return <RadioGroupItem {...item} />
      })
    }

    itemsTest(getChildrenItems, false)
  })
})
