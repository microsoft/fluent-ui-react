import { Icon, Menu, Segment, Text, ICSSInJSStyle } from '@stardust-ui/react'
import { ShorthandValue } from '../../../../types/utils'
import { listItemBehavior, listBehavior } from '../../../../src/lib/accessibility'
import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'

import { NavLink } from 'react-router-dom'

// import { themes } from '@stardust-ui/react'
// import { ThemeContext } from 'docs/src/context/ThemeContext'

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
  /*
  private menuItemsByType = _.map(nextType => {
    const items = _.flow(
      _.filter<ComponentMenuItem>(({ type }) => type === nextType),
      _.map(info => ({
        key: info.displayName.concat(nextType),
        content: info.displayName,
        onClick: this.handleItemClick,
        as: NavLink,
        to: getComponentPathname(info),
        accessibility: listItemBehavior,
      })),
    )([...componentMenu, ...behaviorMenu])
    return { items }
  }, constants.typeOrder)
*/

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
    // return (
    //  <Menu.Item key={nextType}>
    //    <Menu.Header>{_.capitalize(nextType)}s</Menu.Header>
    //    <Menu.Menu>{items}</Menu.Menu>
    //  </Menu.Item>
    // )
  })

  // private renderSearchItems = () => {
  //   const { selectedItemIndex, query } = this.state
  //   if (!query) return undefined

  //   let itemIndex = -1
  //   const startsWithMatches: ComponentMenuItem[] = []
  //   const containsMatches: ComponentMenuItem[] = []
  //   const escapedQuery = _.escapeRegExp(query)

  //   _.each(info => {
  //     if (new RegExp(`^${escapedQuery}`, 'i').test(info.displayName)) {
  //       startsWithMatches.push(info)
  //     } else if (new RegExp(escapedQuery, 'i').test(info.displayName)) {
  //       containsMatches.push(info)
  //     }
  //   }, componentMenu)

  //   this.filteredMenu = [...startsWithMatches, ...containsMatches]
  //   const menuItems = _.map(info => {
  //     itemIndex += 1
  //     const isSelected = itemIndex === selectedItemIndex

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
      width: '230px',
      position: 'fixed',
      overflowY: 'scroll',
      top: '0px',
      bottom: '0px',
      paddingLeft: '1em',
      paddingRight: '0em',
      paddingTop: '0em',
      paddingBottom: '0em',
    }

    const menuSectionStyles: ICSSInJSStyle = {
      marginLeft: '0px',
      paddingLeft: '0px',
      paddingTop: '3px',
      fontWeight: fontWeightBold,
    }
    const navBarStyles: ICSSInJSStyle = {
      padding: '0px',
    }

    const logoStyles: ICSSInJSStyle = {
      padding: '5px',
      color: 'white',
    }
    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`

    const menuItems: ShorthandValue[] = [
      {
        key: 'github',
        content: (
          <div style={flexDislayStyle}>
            GitHub
            <Icon name="chess rook" styles={{ float: 'right' }} />
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
        kind: 'Divider',
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
        kind: 'Divider',
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

    const withComponents = menuItems.concat(componentMenuItem).concat(this.menuItemsByType[0].items)
    const allItems = withComponents.concat(behaviorMenuItem).concat(this.menuItemsByType[1].items)

    // {query ? this.renderSearchItems() : this.menuItemsByType},
    return (
      <Segment
        styles={sidebarStyles}
        content={
          <div>
            <Logo width="32px" styles={logoStyles} />
            <Text color="white" content="Stardust UI React &nbsp;" styles={logoStyles} />
            <Text
              color="white"
              content={pkg.version}
              size="small"
              weight="bold"
              styles={logoStyles}
            />

            <Menu
              vertical
              fluid
              pills
              accessibility={listBehavior}
              styles={navBarStyles}
              items={allItems}
            />
          </div>
        }
      />
    )
  }

  //  private getThemeOptions = () => {
  //    return Object.keys(themes).map(key => ({
  //      text: _.startCase(key),
  //      value: key,
  //    }))
  //  }
}

export default withRouter(Sidebar)
