import * as React from 'react'

import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests'
import { getTestingRenderedComponent, mountWithProvider } from 'test/utils'

import MenuItem from 'src/components/Menu/MenuItem'
import { ToolbarButtonBehavior, TabBehavior } from '../../../../src/lib/accessibility'

describe('MenuItem', () => {
  isConformant(MenuItem, {
    eventTargets: {
      onClick: 'a',
    },
  })

  it('content renders as `li > a`', () => {
    const menuItem = getTestingRenderedComponent(MenuItem, <MenuItem content="Home" />).find(
      '.ui-menu__item',
    )

    expect(menuItem.is('li')).toBe(true)
    expect(menuItem.childAt(0).is('a')).toBe(true)
    expect(menuItem.text()).toBe('Home')
  })

  it('children render directly inside `li`', () => {
    const menuItem = getTestingRenderedComponent(MenuItem, <MenuItem>Home</MenuItem>)

    expect(menuItem.find('.ui-menu__item').is('li')).toBe(true)
    expect(menuItem.text()).toBe('Home')
  })

  it('menu item renders submenu after click on it', () => {
    const submenu = {
      vertical: true,
      items: [
        { key: 'new', content: 'New' },
        { key: 'open', content: 'Open' },
        { key: 'edit', content: 'Edit' },
      ],
    }
    const menuItem = mountWithProvider(<MenuItem submenu={submenu} content="File" />)
    expect(menuItem.find('.ui-menu').length).toBe(0)
    menuItem.find('a').simulate('click')
    expect(menuItem.find('.ui-menu').is('ul')).toBe(true)
  })

  describe('accessibility', () => {
    handlesAccessibility(MenuItem, { defaultRootRole: 'presentation' })
    handlesAccessibility(MenuItem, { defaultRootRole: 'menuitem', partSelector: 'a' })

    describe('as a ToolbarButton', () => {
      test('root role should be presentation', () => {
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem accessibility={ToolbarButtonBehavior} />,
        )
        expect(getRenderedAttribute(menuItemComponent, 'role', '')).toBe('presentation')
      })

      test('anchor role should be button', () => {
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem accessibility={ToolbarButtonBehavior} />,
        )
        expect(getRenderedAttribute(menuItemComponent, 'role', 'a')).toBe('button')
      })

      test('aria-label should be added to the child anchor', () => {
        const ariaLabel = 'Useful Tool Tip'
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem aria-label={ariaLabel} accessibility={ToolbarButtonBehavior} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-label', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-label', 'a')).toBe(ariaLabel)
      })

      test('aria-labelledby should be added to the child anchor', () => {
        const ariaLabelledByID = 'element-that-labels'
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem aria-labelledby={ariaLabelledByID} accessibility={ToolbarButtonBehavior} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-labelledby', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-labelledby', 'a')).toBe(
          ariaLabelledByID,
        )
      })

      const disabledFlags = [true, false]
      disabledFlags.forEach(disabledValue => {
        test(`aria-disabled should be ${disabledValue} if button disabled prop is ${disabledValue}`, () => {
          const menuItemComponent = getTestingRenderedComponent(
            MenuItem,
            <MenuItem disabled={disabledValue} accessibility={ToolbarButtonBehavior} />,
          )

          expect(getRenderedAttribute(menuItemComponent, 'aria-disabled', '')).toBe(undefined)
          expect(getRenderedAttribute(menuItemComponent, 'aria-disabled', 'a')).toBe(
            '' + disabledValue,
          )
        })
      })
    })

    describe('as a Tab', () => {
      test('root role should be presentation', () => {
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem accessibility={TabBehavior} />,
        )
        expect(getRenderedAttribute(menuItemComponent, 'role', '')).toBe('presentation')
      })

      test('anchor role should be tab', () => {
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem accessibility={TabBehavior} />,
        )
        expect(getRenderedAttribute(menuItemComponent, 'role', 'a')).toBe('tab')
      })

      test('aria-label should be added to the child anchor', () => {
        const ariaLabel = 'Useful Tool Tip'
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem aria-label={ariaLabel} accessibility={TabBehavior} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-label', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-label', 'a')).toBe(ariaLabel)
      })

      test('aria-labelledby should be added to the child anchor', () => {
        const ariaLabelledByID = 'element-that-labels'
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem aria-labelledby={ariaLabelledByID} accessibility={TabBehavior} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-labelledby', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-labelledby', 'a')).toBe(
          ariaLabelledByID,
        )
      })

      const activeFlags = [true, false]
      activeFlags.forEach(activeValue => {
        test(`aria-selected should be ${activeValue} if button active prop is ${activeValue}`, () => {
          const menuItemComponent = getTestingRenderedComponent(
            MenuItem,
            <MenuItem active={activeValue} accessibility={TabBehavior} />,
          )

          expect(getRenderedAttribute(menuItemComponent, 'aria-selected', '')).toBe(undefined)
          expect(getRenderedAttribute(menuItemComponent, 'aria-selected', 'a')).toBe(
            '' + activeValue,
          )
        })
      })

      test('aria-controls should be added to the child anchor', () => {
        const ariaControlsPanelID = 'panel-that-is-controlled'
        const menuItemComponent = getTestingRenderedComponent(
          MenuItem,
          <MenuItem aria-controls={ariaControlsPanelID} accessibility={TabBehavior} />,
        )

        expect(getRenderedAttribute(menuItemComponent, 'aria-controls', '')).toBe(undefined)
        expect(getRenderedAttribute(menuItemComponent, 'aria-controls', 'a')).toBe(
          ariaControlsPanelID,
        )
      })
    })
  })
})
