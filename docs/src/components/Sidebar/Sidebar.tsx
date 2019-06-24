import { ICSSInJSStyle } from '@stardust-ui/react'
import { ShorthandValue } from '../../../../packages/react/src/types'
import { getComponentPathname } from 'docs/src/utils'
import keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'

import { NavLink } from 'react-router-dom'

import { constants } from 'src/lib'

type ComponentMenuItem = { displayName: string; type: string }

const pkg = require('../../../../packages/react/package.json')
const componentMenu: ComponentMenuItem[] = require('docs/src/componentMenu')
const behaviorMenu: ComponentMenuItem[] = require('docs/src/behaviorMenu')

class Sidebar extends React.Component<any, any> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    style: PropTypes.object,
  }
  state: any = { query: '', animation: '' }
  _searchInput: any
  selectedRoute: any
  filteredMenu = componentMenu

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown)
    this.setSearchInput()
  }

  componentDidUpdate() {
    this.setSearchInput()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  setSearchInput() {
    // TODO: Replace findDOMNode with Ref component when it will be merged
    this._searchInput = (findDOMNode(this) as any).querySelector('.ui.input input')
  }

  handleDocumentKeyDown = e => {
    const code = keyboardKey.getCode(e)
    const isAZ = code >= 65 && code <= 90
    const hasModifier = e.altKey || e.ctrlKey || e.metaKey
    const bodyHasFocus = document.activeElement === document.body

    if (!hasModifier && isAZ && bodyHasFocus) this._searchInput.focus()
  }

  handleItemClick = () => {
    const { query } = this.state

    if (query) this.setState({ query: '' })
    // TODO: as part of search input re-enabling
    // if (document.activeElement === this._searchInput) this._searchInput.blur()
  }

  /* TODO: as part of search input re-enabling
    private renderSearchItems = () => {
      const { selectedItemIndex, query } = this.state
      if (!query) return undefined

      let itemIndex = -1
      const startsWithMatches: ComponentMenuItem[] = []
      const containsMatches: ComponentMenuItem[] = []
      const escapedQuery = _.escapeRegExp(query)

      _.each(componentMenu, info => {
        if (new RegExp(`^${escapedQuery}`, 'i').test(info.displayName)) {
          startsWithMatches.push(info)
        } else if (new RegExp(escapedQuery, 'i').test(info.displayName)) {
          containsMatches.push(info)
        }
      })

      this.filteredMenu = [...startsWithMatches, ...containsMatches]
      const menuItems = _.map(this.filteredMenu, info => {
        itemIndex += 1
        const isSelected = itemIndex === selectedItemIndex

        if (isSelected) this.selectedRoute = getComponentPathname(info)

        return (
          <Menu.Item
            key={info.displayName}
            content={info.displayName}
            onClick={this.handleItemClick}
            active={isSelected}
            as={NavLink}
            to={getComponentPathname(info)}
          />
        )
      }, this.filteredMenu)

      return (
        <Menu.Item
          key={info.displayName}
          name={info.displayName}
          onClick={this.handleItemClick}
          active={isSelected}
          as={NavLink}
          to={getComponentPathname(info)}
        >
          {info.displayName}
          {isSelected && selectedItemLabel}
        </Menu.Item>
      )
    })
*/

  render() {
    // Should be applied by provider
    const menuItemStyles: ICSSInJSStyle = {
      padding: '.5em 1.33333333em',
      textDecoration: 'none',
      fontSize: '1em',
      color: '#201f1f',
      ':hover': {
        background: '#f3f2f1',
      },
      ':focus': {
        background: '#f3f2f1',
      },
    }

    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`

    const menuItemsByType = _.map(constants.typeOrder, nextType => {
      const items = _.chain([...componentMenu, ...behaviorMenu])
        .filter(({ type }) => type === nextType)
        .map(info => ({
          key: info.displayName.concat(nextType),
          content: info.displayName,
          onClick: this.handleItemClick,
          as: NavLink,
          to: getComponentPathname(info),
          styles: menuItemStyles,
        }))
        .value()

      return { items }
    })

    const gettingStartedItems: ShorthandValue[] = [
      {
        key: 'intro',
        content: 'Introduction',
        as: NavLink,
        to: '/',
        styles: menuItemStyles,
      },
      {
        key: 'shorthand',
        content: 'Shorthand Props',
        as: NavLink,
        to: '/shorthand-props',
        styles: menuItemStyles,
      },
      {
        key: 'quickstart',
        content: 'QuickStart',
        as: NavLink,
        to: '/quick-start',
        styles: menuItemStyles,
      },
      {
        key: 'faq',
        content: 'FAQ',
        as: NavLink,
        to: '/faq',
        styles: menuItemStyles,
      },
      {
        key: 'accessiblity',
        content: 'Accessibility',
        as: NavLink,
        to: '/accessibility',
        styles: menuItemStyles,
      },
      {
        key: 'theming',
        content: 'Theming',
        as: NavLink,
        to: '/theming',
        styles: menuItemStyles,
      },
    ]

    const guidesItems: ShorthandValue[] = [
      {
        key: 'theming-examples',
        content: 'Theming Examples',
        as: NavLink,
        to: '/theming-examples',
        styles: menuItemStyles,
      },
      {
        key: 'layout',
        content: 'Layout',
        as: NavLink,
        to: '/layout',
        styles: menuItemStyles,
      },
      {
        key: 'integrate-custom',
        content: 'Integrate Custom Components',
        as: NavLink,
        to: '/integrate-custom-components',
        styles: menuItemStyles,
      },

      // TODO: to re-enable the search input - will modify the list of the components depending on the search results
      // {query ? this.renderSearchItems() : this.menuItemsByType},
      // {
      //   key: 'search',
      //   content: (
      //     <Input
      //       className="transparent inverted icon"
      //       icon="search"
      //       placeholder="Search components..."
      //       value={query}
      //       onChange={this.handleSearchChange}
      //       onKeyDown={this.handleSearchKeyDown}
      //     />
      //   ),
      // },
    ]

    // const prototypesMenuItemTitle = {
    //   key: 'prototypes',
    //   content: 'Prototypes',
    //   styles: menuSectionStyles,
    //   disabled: true,
    // }

    // const prototypesMenuItems: ShorthandValue[] = [
    //   {
    //     key: 'chatpane',
    //     content: 'Chat Pane',
    //     as: NavLink,
    //     to: '/prototype-chat-pane',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'chatMssages',
    //     content: 'Chat Messages',
    //     as: NavLink,
    //     to: '/prototype-chat-messages',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'dropdowns',
    //     content: 'Dropdowns',
    //     as: NavLink,
    //     to: '/prototype-dropdowns',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'alerts',
    //     content: 'Alerts',
    //     as: NavLink,
    //     to: '/prototype-alerts',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'asyncshorthand',
    //     content: 'Async Shorthand',
    //     as: NavLink,
    //     to: '/prototype-async-shorthand',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'employeecard',
    //     content: 'Employee Card',
    //     as: NavLink,
    //     to: '/prototype-employee-card',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'meetingoptions',
    //     content: 'Meeting Options',
    //     as: NavLink,
    //     to: '/prototype-meeting-options',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'mentions',
    //     content: 'Mentions',
    //     as: NavLink,
    //     to: '/prototype-mentions',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'searchpage',
    //     content: 'Search Page',
    //     as: NavLink,
    //     to: '/prototype-search-page',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'popups',
    //     content: 'Popups',
    //     as: NavLink,
    //     to: '/prototype-popups',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'iconviewer',
    //     content: 'Processed Icons',
    //     as: NavLink,
    //     to: '/icon-viewer',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'menu-button',
    //     content: 'MenuButton',
    //     as: NavLink,
    //     to: '/menu-button',
    //     styles: menuItemStyles,
    //   },
    //   {
    //     key: 'divider4',
    //     kind: 'divider',
    //     styles: dividerStyles,
    //   },
    // ]

    // const withPrototypes =
    //   process.env.NODE_ENV !== 'production'
    //     ? menuItems.concat(prototypesMenuItemTitle).concat(prototypesMenuItems)
    //     : menuItems

    // const withComponents = withPrototypes.concat(componentMenuItem).concat(menuItemsByType[0].items)
    // const allItems = withComponents
    //   .concat({
    //     key: 'divider5',
    //     kind: 'divider',
    //     styles: dividerStyles,
    //   })
    //   .concat(behaviorMenuItem)
    //   .concat(menuItemsByType[1].items)

    const stylesItems: ShorthandValue[] = [
      {
        key: 'colorpalette',
        content: 'Colors',
        as: NavLink,
        to: '/colors',
        styles: menuItemStyles,
      },
      {
        key: 'icons',
        content: 'Icons',
        as: NavLink,
        to: '/icons',
        styles: menuItemStyles,
      },
    ]

    const stylesListItems = stylesItems.map(item => (
      <li key={item.key} role="presentation" className="sd_sidebarMenuItem">
        <a role="menuitem" className="sd_sidebarMenuItemLink" href={item.to}>
          {item.content}
        </a>
      </li>
    ))

    const gettingStartedListItems = gettingStartedItems.map(item => (
      <li key={item.key} role="presentation" className="sd_sidebarMenuItem">
        <a role="menuitem" className="sd_sidebarMenuItemLink" href={item.to}>
          {item.content}
        </a>
      </li>
    ))

    const guidesListItems = guidesItems.map(item => (
      <li key={item.key} role="presentation" className="sd_sidebarMenuItem">
        <a role="menuitem" className="sd_sidebarMenuItemLink" href={item.to}>
          {item.content}
        </a>
      </li>
    ))

    const componentListItems = menuItemsByType[0].items.map(item => (
      <li key={item.key} role="presentation" className="sd_sidebarMenuItem">
        <a role="menuitem" className="sd_sidebarMenuItemLink" href={item.onClick}>
          {item.content}
        </a>
      </li>
    ))

    const behaviorListItems = menuItemsByType[1].items.map(item => (
      <li key={item.key} role="presentation" className="sd_sidebarMenuItem">
        <a role="menuitem" className="sd_sidebarMenuItemLink" href={item.onClick}>
          {item.content}
        </a>
      </li>
    ))

    // TODO: bring back the active elements indicators
    return (
      <div className="sd_sidebar">
        <div className="sd_sidebarLogo">
          <div className="sd_logo">Stardust</div>
          <div className="sd_version">React UI v. {pkg.version}</div>
        </div>
        <ul className="sd_sidebarMenu">
          <li key="divider1" className="sd_divider" />

          <li key="gettingstarted" className="sd_sidebarMenuSection">
            Getting started
          </li>
          {gettingStartedListItems}

          <li key="guides" className="sd_sidebarMenuSection">
            Guides
          </li>
          {guidesListItems}

          <li key="styles" className="sd_sidebarMenuSection">
            Styles
          </li>
          {stylesListItems}

          <li key="components" className="sd_sidebarMenuSection">
            Components
          </li>
          {componentListItems}

          <li key="behaviors" className="sd_sidebarMenuSection">
            Behaviors
          </li>
          {behaviorListItems}
        </ul>
        ,
        <div className="sd_sidebarLogo">
          <a href={constants.repoURL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>

          <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">
            Changelog
          </a>
        </div>
        {/* <Menu vertical fluid pills styles={navBarStyles} items={allItems} /> */}
      </div>
    )
  }
}

export default withRouter(Sidebar)
