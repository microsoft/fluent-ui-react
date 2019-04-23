import { Icon, Menu, Segment, Text, ICSSInJSStyle } from '@stardust-ui/react'
import { ShorthandValue } from '../../../../packages/react/src/types'
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

const pkg = require('../../../../packages/react/package.json')
const componentMenu: ComponentMenuItem[] = require('docs/src/componentMenu')
const behaviorMenu: ComponentMenuItem[] = require('docs/src/behaviorMenu')

const flexDislayStyle: any = { width: '100%' }

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
    const sidebarStyles: ICSSInJSStyle = {
      background: '#201f1f',
      width: '250px',
      position: 'fixed',
      overflowY: 'scroll',
      top: 0,
      left: 0,
      padding: 0,
      maxHeight: '100vh',
    }

    const menuSectionStyles: ICSSInJSStyle = {
      fontWeight: fontWeightBold,
      margin: '0 0 .5rem',
      padding: '0 1.2857rem',
      background: '#201f1f',
      color: 'white',
      ':hover': {
        background: 'none',
        color: 'white',
      },
      ':focus': {
        background: 'none',
        color: 'white',
      },
    }

    const menuItemStyles: ICSSInJSStyle = {
      padding: '.5em 1.33333333em',
      textDecoration: 'none',
      fontSize: '0.85714286em',
      fontWeight: 400,
      color: '#ffffff80',
      background: '#201f1f',
      ':hover': {
        color: 'white',
        backgroundColor: 'none',
      },
      ':focus': {
        color: 'white',
        backgroundColor: 'none',
      },
    }

    const dividerStyles: ICSSInJSStyle = {
      marginTop: '.5em',
      paddingBottom: '.5em',
      background: '#201f1f',
    }

    const navBarStyles: ICSSInJSStyle = {
      color: '#ffffff80',
      padding: '0px',
      backgroundColor: '#201f1f',
    }

    const logoStyles: ICSSInJSStyle = {
      paddingRight: '5px',
      color: 'white',
      fontWeight: 700,
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

    const menuItems: ShorthandValue[] = [
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
        styles: menuItemStyles,
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
        styles: menuItemStyles,
      },
      {
        key: 'divider1',
        kind: 'divider',
        styles: dividerStyles,
      },
      {
        key: 'concepts',
        content: 'Concepts',
        styles: menuSectionStyles,
        disabled: true,
      },
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
        key: 'divider2',
        kind: 'divider',
        styles: dividerStyles,
      },
      {
        key: 'guides',
        content: 'Guides',
        styles: menuSectionStyles,
        disabled: true,
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
      {
        key: 'divider3',
        kind: 'divider',
        styles: dividerStyles,
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

    const prototypesMenuItemTitle = {
      key: 'prototypes',
      content: 'Prototypes',
      styles: menuSectionStyles,
      disabled: true,
    }

    const prototypesMenuItems: ShorthandValue[] = [
      {
        key: 'chatpane',
        content: 'Chat Pane',
        as: NavLink,
        to: '/prototype-chat-pane',
        styles: menuItemStyles,
      },
      {
        key: 'chatMssages',
        content: 'Chat Messages',
        as: NavLink,
        to: '/prototype-chat-messages',
        styles: menuItemStyles,
      },
      {
        key: 'dropdowns',
        content: 'Dropdowns',
        as: NavLink,
        to: '/prototype-dropdowns',
        styles: menuItemStyles,
      },
      {
        key: 'alerts',
        content: 'Alerts',
        as: NavLink,
        to: '/prototype-alerts',
        styles: menuItemStyles,
      },
      {
        key: 'asyncshorthand',
        content: 'Async Shorthand',
        as: NavLink,
        to: '/prototype-async-shorthand',
        styles: menuItemStyles,
      },
      {
        key: 'employeecard',
        content: 'Employee Card',
        as: NavLink,
        to: '/prototype-employee-card',
        styles: menuItemStyles,
      },
      {
        key: 'meetingoptions',
        content: 'Meeting Options',
        as: NavLink,
        to: '/prototype-meeting-options',
        styles: menuItemStyles,
      },
      {
        key: 'searchpage',
        content: 'Search Page',
        as: NavLink,
        to: '/prototype-search-page',
        styles: menuItemStyles,
      },
      {
        key: 'popups',
        content: 'Popups',
        as: NavLink,
        to: '/prototype-popups',
        styles: menuItemStyles,
      },
      {
        key: 'iconviewer',
        content: 'Processed Icons',
        as: NavLink,
        to: '/icon-viewer',
        styles: menuItemStyles,
      },
      {
        key: 'menu-button',
        content: 'MenuButton',
        as: NavLink,
        to: '/menu-button',
        styles: menuItemStyles,
      },
      {
        key: 'colorpalette',
        content: 'Color Palette',
        as: NavLink,
        to: '/color-palette',
        styles: menuItemStyles,
      },
      {
        key: 'divider4',
        kind: 'divider',
        styles: dividerStyles,
      },
    ]

    const withPrototypes =
      process.env.NODE_ENV !== 'production'
        ? menuItems.concat(prototypesMenuItemTitle).concat(prototypesMenuItems)
        : menuItems

    const componentMenuItem = {
      key: 'components',
      content: 'Components',
      styles: menuSectionStyles,
      disabled: true,
    }
    const behaviorMenuItem = {
      key: 'behaviour',
      content: 'Behaviors',
      styles: menuSectionStyles,
      disabled: true,
    }

    const withComponents = withPrototypes.concat(componentMenuItem).concat(menuItemsByType[0].items)
    const allItems = withComponents
      .concat({
        key: 'divider5',
        kind: 'divider',
        styles: dividerStyles,
      })
      .concat(behaviorMenuItem)
      .concat(menuItemsByType[1].items)

    // TODO: bring back the active elements indicators
    return (
      <Segment styles={sidebarStyles}>
        <Segment styles={menuSectionStyles}>
          <Logo width="32px" styles={logoStyles} />
          <Text
            role="heading"
            aria-level="1"
            color="white"
            content="Stardust UI React &nbsp;"
            styles={logoStyles}
          />
          <Text color="white" content={pkg.version} size="medium" styles={logoStyles} />
        </Segment>
        <Menu vertical fluid pills styles={navBarStyles} items={allItems} />
      </Segment>
    )
  }
}

export default withRouter(Sidebar)
