import { Icon, Menu, Segment, Text, ICSSInJSStyle } from '@stardust-ui/react'
import { ShorthandValue } from '../../../../packages/react/src/types'
import { listItemBehavior, listBehavior } from '../../../../packages/react/src/lib/accessibility'
import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'

import { NavLink } from 'react-router-dom'

import { constants } from 'src/lib'
import { fontWeightBold } from 'src/themes/teams/siteVariables'

type ComponentMenuItem = { displayName: string; type: string }

const pkg = require('../../../../package.json')
const componentMenu: ComponentMenuItem[] = require('docs/src/componentMenu')
const behaviorMenu: ComponentMenuItem[] = require('docs/src/behaviorMenu')

// const selectedItemLabelStyle: any = { color: '#35bdb2', float: 'right' }
const flexDislayStyle: any = { width: '100%' }
// const selectedItemLabel = <span style={selectedItemLabelStyle}>Press Enter</span>

class Sidebar extends React.Component<any, any> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    style: PropTypes.object,
  }
  state: any = { query: '' }
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

  private handleDocumentKeyDown = e => {
    const code = keyboardKey.getCode(e)
    const isAZ = code >= 65 && code <= 90
    const hasModifier = e.altKey || e.ctrlKey || e.metaKey
    const bodyHasFocus = document.activeElement === document.body

    if (!hasModifier && isAZ && bodyHasFocus) this._searchInput.focus()
  }

  private handleItemClick = () => {
    const { query } = this.state

    if (query) this.setState({ query: '' })
    //   if (document.activeElement === this._searchInput) this._searchInput.blur()
  }

  private menuItemsByType = _.map(constants.typeOrder, nextType => {
    const items = _.chain([...componentMenu, ...behaviorMenu])
      .filter(({ type }) => type === nextType)
      .map(info => ({
        key: info.displayName.concat(nextType),
        content: info.displayName,
        onClick: this.handleItemClick,
        as: NavLink,
        to: getComponentPathname(info),
        accessibility: listItemBehavior,
      }))
      .value()

    return { items }
  })

  // private renderSearchItems = () => {
  //   const { selectedItemIndex, query } = this.state
  //   if (!query) return undefined

  //   let itemIndex = -1
  //   const startsWithMatches: ComponentMenuItem[] = []
  //   const containsMatches: ComponentMenuItem[] = []
  //   const escapedQuery = _.escapeRegExp(query)

  /*
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
*/

  //     if (isSelected) this.selectedRoute = getComponentPathname(info)

  //     return (
  //       <Menu.Item
  //         key={info.displayName}
  //         content={info.displayName}
  //         onClick={this.handleItemClick}
  //         active={isSelected}
  //         as={NavLink}
  //         to={getComponentPathname(info)}
  //       />
  //     )
  //   }, this.filteredMenu)

  /*     return (
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

  //   return <Menu vertical pills items={menuItems} />
  // }

  render() {
    // Should be applied by provider
    const sidebarStyles: ICSSInJSStyle = {
      width: '250px',
      position: 'fixed',
      overflowY: 'scroll',
      top: '0px',
      bottom: '0px',
      paddingLeft: '0em',
      paddingRight: '0em',
      paddingTop: '0em',
      paddingBottom: '0em',
    }

    const menuSectionStyles: ICSSInJSStyle = {
      fontWeight: fontWeightBold,
      color: 'white',
      ':hover, :focus': {
        background: 'none',
      },
    }
    const navBarStyles: ICSSInJSStyle = {
      color: '#ffffff80',
      padding: '0px',
    }

    const logoStyles: ICSSInJSStyle = {
      paddingRight: '5px',
      color: 'white',
      fontWeight: 700,
    }
    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`

    const menuItems: ShorthandValue[] = [
      {
        key: 'stardust',
        content: (
          <>
            <Logo width="32px" styles={logoStyles} />
            <Text color="white" content="Stardust UI React &nbsp;" styles={logoStyles} />
            <Text color="white" content={pkg.version} size="medium" styles={logoStyles} />
          </>
        ),
        styles: menuSectionStyles,
        accessibility: listItemBehavior,
      },
      {
        key: 'github',
        content: (
          <div style={flexDislayStyle}>
            GitHub
            <Icon name="github" styles={{ float: 'right' }} />
          </div>
        ),
        href: constants.repoURL,
        target: '_blank',
        rel: 'noopener noreferrer',
        accessibility: listItemBehavior,
      },
      {
        key: 'change',
        content: (
          <div style={flexDislayStyle}>
            CHANGELOG
            <Icon name="file alternate outline" styles={{ float: 'right' }} />
          </div>
        ),
        href: changeLogUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        accessibility: listItemBehavior,
      },
      {
        key: 'divider1',
        kind: 'divider',
      },
      {
        key: 'concepts',
        content: 'Concepts',
        styles: menuSectionStyles,
        accessibility: listItemBehavior,
      },
      {
        key: 'intro',
        content: 'Introduction',
        as: NavLink,
        to: '/',
        accessibility: listItemBehavior,
      },
      {
        key: 'color',
        content: 'Color Palette',
        as: NavLink,
        to: '/color-palette',
        accessibility: listItemBehavior,
      },
      {
        key: 'shorthand',
        content: 'Shorthand Props',
        as: NavLink,
        to: '/shorthand-props',
        accessibility: listItemBehavior,
      },
      {
        key: 'divider2',
        kind: 'divider',
      },
      {
        key: 'guides',
        content: 'Guides',
        styles: menuSectionStyles,
        accessibility: listItemBehavior,
      },
      {
        key: 'quickstart',
        content: 'QuickStart',
        as: NavLink,
        to: '/quick-start',
        accessibility: listItemBehavior,
      },
      {
        key: 'accessiblity',
        content: 'Accessibility',
        as: NavLink,
        to: '/accessibility',
        accessibility: listItemBehavior,
      },
      {
        key: 'theming',
        content: 'Theming',
        as: NavLink,
        to: '/theming',
        accessibility: listItemBehavior,
      },
      {
        key: 'theming-examples',
        content: 'Theming Examples',
        as: NavLink,
        to: '/theming-examples',
        accessibility: listItemBehavior,
      },
      {
        key: 'integrate-custom',
        content: 'Integrate Custom Components',
        as: NavLink,
        to: '/integrate-custom-components',
        accessibility: listItemBehavior,
      },
      {
        key: 'divider3',
        kind: 'divider',
      },
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

    const prototypesMenuItemTitle = {
      key: 'prototypes',
      content: 'Prototypes',
      styles: menuSectionStyles,
      accessibility: listItemBehavior,
    }

    const prototypesMenuItems: ShorthandValue[] = [
      {
        key: 'chatpane',
        content: 'Chat Pane',
        as: NavLink,
        to: '/prototype-chat-pane',
        accessibility: listItemBehavior,
      },
      {
        key: 'chatmessagepopover',
        content: 'Chat message with popover',
        as: NavLink,
        to: '/prototype-chat-message-with-popover',
        accessibility: listItemBehavior,
      },
      {
        key: 'asyncdropdown',
        content: 'Async Dropdown Search',
        as: NavLink,
        to: '/prototype-async-dropdown-search',
        accessibility: listItemBehavior,
      },
      {
        key: 'asyncshorthand',
        content: 'Async Shorthand',
        as: NavLink,
        to: '/prototype-async-shorthand',
        accessibility: listItemBehavior,
      },
      {
        key: 'employeecard',
        content: 'Employee Card',
        as: NavLink,
        to: '/prototype-employee-card',
        accessibility: listItemBehavior,
      },
      {
        key: 'meetingoptions',
        content: 'Meeting Options',
        as: NavLink,
        to: '/prototype-meeting-options',
        accessibility: listItemBehavior,
      },
      {
        key: 'searchpage',
        content: 'Search Page',
        as: NavLink,
        to: '/prototype-search-page',
        accessibility: listItemBehavior,
      },
      {
        key: 'popups',
        content: 'Popups',
        as: NavLink,
        to: '/prototype-popups',
        accessibility: listItemBehavior,
      },
      {
        key: 'iconviewer',
        content: 'Processed Icons',
        as: NavLink,
        to: '/icon-viewer',
        accessibility: listItemBehavior,
      },
      {
        key: 'importantmentionmessages',
        content: 'Important and mention messages',
        as: NavLink,
        to: '/important-and-mention-messages',
        accessiility: listItemBehavior,
      },
      {
        key: 'colorpalette',
        content: 'Color Palette',
        as: NavLink,
        to: '/color-palette',
        accessibility: listItemBehavior,
      },
      {
        key: 'divider4',
        kind: 'divider',
      },
    ]

    const withPrototypes =
      process.env.NODE_ENV !== 'production'
        ? menuItems.concat(prototypesMenuItemTitle).concat(prototypesMenuItems)
        : []

    const componentMenuItem = {
      key: 'components',
      content: 'Components',
      styles: menuSectionStyles,
      accessibility: listItemBehavior,
    }
    const behaviorMenuItem = {
      key: 'behaviour',
      content: 'Behaviors',
      styles: menuSectionStyles,
      accessibility: listItemBehavior,
    }

    const withComponents = withPrototypes
      .concat(componentMenuItem)
      .concat(this.menuItemsByType[0].items)
    const allItems = withComponents
      .concat({
        key: 'divider5',
        kind: 'divider',
      })
      .concat(behaviorMenuItem)
      .concat(this.menuItemsByType[1].items)

    // {query ? this.renderSearchItems() : this.menuItemsByType},
    // TODO: bring back the active elements indicators
    return (
      <Segment
        styles={sidebarStyles}
        content={
          <Menu
            vertical
            fluid
            pills
            accessibility={listBehavior}
            styles={navBarStyles}
            items={allItems}
          />
        }
      />
      /*
      <ThemeContext.Consumer>
        {({ themeName, changeTheme }) => (
          <Menu vertical fixed="left" inverted style={{ ...style }}>
            {process.env.NODE_ENV !== 'production' && (
              <Menu.Item>
                <p>Theme:</p>
                <select
                  placeholder="Select theme..."
                  defaultValue={themeName}
                  onChange={e => {
                    changeTheme(e.target.value)
                  }}
                >
                  {this.getThemeOptions().map(o => (
                    <option key={o.value} value={o.value}>
                      {o.text}
                    </option>
                  ))}
                </select>
              </Menu.Item>
            )}
            <Menu.Item active>
              <SemanticUIInput
                className="transparent inverted icon"
                icon="search"
                placeholder="Search components..."
                value={query}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
              />
            </Menu.Item>
            {query ? this.renderSearchItems() : this.menuItemsByType}
          </Menu>
        )}
      </ThemeContext.Consumer>
*/
    )
  }
}

export default withRouter(Sidebar)
