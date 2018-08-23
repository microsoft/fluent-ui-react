import * as React from 'react'

import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { getTestingRenderedComponent, mountWithProvider } from 'test/utils'

import MenuItem from 'src/components/Menu/MenuItem'

describe('MenuItem', () => {
  isConformant(MenuItem, {
    eventTargets: {
      onClick: 'a',
    },
  })
  handlesAccessibility(MenuItem, { defaultRootRole: 'presentation' })
  handlesAccessibility(MenuItem, { defaultRootRole: 'menuitem', partSelector: 'a' })

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
})
