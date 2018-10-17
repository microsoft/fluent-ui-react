import * as React from 'react'

import Menu from 'src/components/Menu/Menu'
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProvider, getTestingRenderedComponent } from 'test/utils'
import { toolbarBehavior, tabListBehavior } from '../../../../src/lib/accessibility'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import MenuItem from 'src/components/Menu/MenuItem'
import { menuBehavior } from 'src/lib/accessibility'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'

const menuImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Menu)

describe('Menu', () => {
  isConformant(Menu)
  menuImplementsCollectionShorthandProp('items', MenuItem)

  const getItems = () => [
    { key: 'home', content: 'home', onClick: jest.fn(), 'data-foo': 'something' },
    { key: 'users', content: 'users', 'data-foo': 'something' },
  ]

  describe('items', () => {
    it('renders children', () => {
      const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem')

      expect(menuItems.length).toBe(2)
      expect(menuItems.first().props().content).toBe('home')
      expect(menuItems.last().props().content).toBe('users')
    })

    it('calls onClick handler for item', () => {
      const items = getItems()
      const menuItems = mountWithProvider(<Menu items={items} />).find('MenuItem')

      menuItems
        .first()
        .find('a')
        .first()
        .simulate('click')
      expect(items[0].onClick).toHaveBeenCalled()
    })

    it('passes arbitrary props', () => {
      const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem')

      expect(menuItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true)
    })

    describe('activeIndex', () => {
      it('should not be set by default', () => {
        const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem')

        expect(menuItems.everyWhere(item => !item.is('[active="true"]'))).toBe(true)
      })

      it('should be set when item is clicked', () => {
        const wrapper = mountWithProvider(<Menu items={getItems()} />)
        const menuItems = wrapper.find('MenuItem')

        menuItems
          .at(1)
          .find('a')
          .first()
          .simulate('click')

        const updatedItems = wrapper.find('MenuItem')

        expect(updatedItems.at(0).props().active).toBe(false)
        expect(updatedItems.at(1).props().active).toBe(true)
      })
    })

    describe('accessibility', () => {
      handlesAccessibility(Menu, {
        defaultRootRole: 'menu',
        focusZoneDefinition: (menuBehavior as IAccessibilityDefinition).focusZone,
      })

      test('aria-label should be added to the menu', () => {
        const ariaLabel = 'A Nice Toolbar'
        const menuItemComponent = getTestingRenderedComponent(Menu, <Menu aria-label={ariaLabel} />)

        expect(getRenderedAttribute(menuItemComponent, 'aria-label', '')).toBe(ariaLabel)
      })

      test('aria-labelledby should be added to the menu', () => {
        const ariaLabelledByID = 'element-that-labels'
        const menuItemComponent = getTestingRenderedComponent(
          Menu,
          <Menu aria-labelledby={ariaLabelledByID} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-labelledby', '')).toBe(
          ariaLabelledByID,
        )
      })

      describe('as a Toolbar', () => {
        test('root role should be toolbar', () => {
          const menuItemComponent = getTestingRenderedComponent(
            Menu,
            <Menu accessibility={toolbarBehavior} />,
          )
          expect(getRenderedAttribute(menuItemComponent, 'role', '')).toBe('toolbar')
        })
      })

      describe('as a TabList', () => {
        test('root role should be tablist', () => {
          const menuItemComponent = getTestingRenderedComponent(
            Menu,
            <Menu accessibility={tabListBehavior} />,
          )
          expect(getRenderedAttribute(menuItemComponent, 'role', '')).toBe('tablist')
        })
      })
    })
  })
})
