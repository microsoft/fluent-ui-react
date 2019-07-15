import {
  Icon,
  Tree,
  Segment,
  Text,
  ICSSInJSStyle,
  Provider,
  TreeItemProps,
  TreeProps,
} from '@stardust-ui/react'
import { ShorthandValue } from '../../../../packages/react/src/types'
import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { NavLink, withRouter } from 'react-router-dom'

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

  keyDownCallback(e) {
    if (keyboardKey.getCode(e) !== keyboardKey.Enter) {
      return
    }
    e.stopPropagation()
    e.target.click()
  }

  addItemKeyCallbacks(sections: ShorthandValue<any>[]) {
    for (let i = 0; i < sections.length; i++) {
      const category = sections[i]
      if ('items' in category) {
        this.addItemKeyCallbacks(category.items)
      } else {
        if (!('title' in category)) {
          continue
        }
        category['onKeyDown'] = e => {
          this.keyDownCallback(e)
        }
      }
    }
  }

  getTreeItems(treeSectionStyles, treeItemStyles): ShorthandValue[] {
    return [
      {
        key: 'concepts',
        title: 'Concepts',
        styles: treeSectionStyles,
        items: [
          {
            key: 'intro',
            title: {
              content: 'Introduction',
              exact: true,
              activeClassName: 'active',
              as: NavLink,
              to: '/',
            },
            styles: treeItemStyles,
          },
          {
            key: 'composition',
            title: {
              as: NavLink,
              content: 'Composition',
              activeClassName: 'active',
              to: '/composition',
            },
            styles: treeItemStyles,
          },
          {
            key: 'shorthand',
            title: {
              as: NavLink,
              content: 'Shorthand Props',
              activeClassName: 'active',
              to: '/shorthand-props',
            },
            styles: treeItemStyles,
          },
        ],
      },
      {
        key: 'guides',
        title: 'Guides',
        styles: treeSectionStyles,
        items: [
          {
            key: 'quickstart',
            title: {
              content: 'QuickStart',
              as: NavLink,
              activeClassName: 'active',
              to: 'quick-start',
            },
            styles: treeItemStyles,
          },
          {
            key: 'faq',
            title: { content: 'FAQ', as: NavLink, activeClassName: 'active', to: '/faq' },
            styles: treeItemStyles,
          },
          {
            key: 'accessiblity',
            title: {
              content: 'Accessibility',
              as: NavLink,
              activeClassName: 'active',
              to: '/accessibility',
            },
            styles: treeItemStyles,
          },
          {
            key: 'theming',
            title: { content: 'Theming', as: NavLink, activeClassName: 'active', to: '/theming' },
            styles: treeItemStyles,
          },
          {
            key: 'theming-examples',
            title: {
              content: 'Theming Examples',
              as: NavLink,
              activeClassName: 'active',
              to: '/theming-examples',
            },
            styles: treeItemStyles,
          },
          {
            key: 'colorpalette',
            title: { content: 'Colors', as: NavLink, activeClassName: 'active', to: '/colors' },
            styles: treeItemStyles,
          },
          {
            key: 'layout',
            title: { content: 'Layout', as: NavLink, activeClassName: 'active', to: '/layout' },
            styles: treeItemStyles,
          },
          {
            key: 'integrate-custom',
            title: {
              content: 'Integrate Custom Components',
              as: NavLink,
              activeClassName: 'active',
              to: '/integrate-custom-components',
            },
            styles: treeItemStyles,
          },
        ],
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
  }

  render() {
    // Should be applied by provider
    const sidebarStyles: ICSSInJSStyle = {
      background: '#201f1f',
      width: this.props.width,
      position: 'fixed',
      overflowY: 'scroll',
      top: 0,
      left: 0,
      padding: 0,
      height: '100%',
      zIndex: 1000,
    }

    const treeSectionStyles: ICSSInJSStyle = {
      fontWeight: fontWeightBold,
      margin: '0 0 .5rem',
      padding: '0 1.2857rem',
      background: '#201f1f',
      color: 'white',
    }

    const treeItemStyles: ICSSInJSStyle = {
      padding: '.5em 1.33333333em',
      textDecoration: 'none',
      fontSize: '0.85714286em',
      fontWeight: 400,
      color: '#ffffff80',

      '& .active': {
        fontWeight: 'bold',
      },
    }

    const logoStyles: ICSSInJSStyle = {
      paddingRight: '5px',
      color: 'white',
      fontWeight: 700,
    }
    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`

    const treeItemsByType = _.map(constants.typeOrder, nextType => {
      const items = _.chain([...componentMenu, ...behaviorMenu])
        .filter(({ type }) => type === nextType)
        .map(info => ({
          key: info.displayName.concat(nextType),
          title: { content: info.displayName, as: NavLink, to: getComponentPathname(info) },
          onClick: this.handleItemClick,
          styles: treeItemStyles,
        }))
        .value()

      return { items }
    })

    const topTreeItems: TreeProps['items'] = [
      {
        key: 'github',
        title: {
          content: (
            <div style={flexDislayStyle}>
              GitHub
              <Icon name="github" styles={{ float: 'right' }} />
            </div>
          ),
          href: constants.repoURL,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        styles: treeItemStyles,
      },
      {
        key: 'change',
        title: {
          content: (
            <div style={flexDislayStyle}>
              CHANGELOG
              <Icon name="file alternate outline" styles={{ float: 'right' }} />
            </div>
          ),
          href: changeLogUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        styles: treeItemStyles,
      },
    ]

    const treeItems = topTreeItems.concat(this.getTreeItems(treeSectionStyles, treeItemStyles))

    const prototypesTreeItems: TreeProps['items'] = [
      {
        key: 'chatpane',
        title: { content: 'Chat Pane', as: NavLink, to: '/prototype-chat-pane' },
        styles: treeItemStyles,
      },
      {
        key: 'chatMssages',
        title: { content: 'Chat Messages', as: NavLink, to: '/prototype-chat-messages' },
        styles: treeItemStyles,
      },
      {
        key: 'customtoolbar',
        title: { content: 'Custom Styled Toolbar', as: NavLink, to: '/prototype-custom-toolbar' },
        styles: treeItemStyles,
      },
      {
        key: 'dropdowns',
        title: { content: 'Dropdowns', as: NavLink, to: '/prototype-dropdowns' },
        styles: treeItemStyles,
      },
      {
        key: 'alerts',
        title: { content: 'Alerts', as: NavLink, to: '/prototype-alerts' },
        styles: treeItemStyles,
      },
      {
        key: 'asyncshorthand',
        title: { content: 'Async Shorthand', as: NavLink, to: '/prototype-async-shorthand' },
        styles: treeItemStyles,
      },
      {
        key: 'employeecard',
        title: { content: 'Employee Card', as: NavLink, to: '/prototype-employee-card' },
        styles: treeItemStyles,
      },
      {
        key: 'meetingoptions',
        title: { content: 'Meeting Options', as: NavLink, to: '/prototype-meeting-options' },
        styles: treeItemStyles,
      },
      {
        key: 'mentions',
        title: { content: 'Mentions', as: NavLink, to: '/prototype-mentions' },
        styles: treeItemStyles,
      },
      {
        key: 'searchpage',
        title: { content: 'Search Page', as: NavLink, to: '/prototype-search-page' },
        styles: treeItemStyles,
      },
      {
        key: 'popups',
        title: { content: 'Popups', as: NavLink, to: '/prototype-popups' },
        styles: treeItemStyles,
      },
      {
        key: 'iconviewer',
        title: { content: 'Processed Icons', as: NavLink, to: '/icon-viewer' },
        styles: treeItemStyles,
      },
      {
        key: 'menu-button',
        title: { content: 'MenuButton', as: NavLink, to: '/menu-button' },
        styles: treeItemStyles,
      },
    ]

    const prototypeTreeSection = {
      key: 'prototypes',
      title: 'Prototypes',
      styles: treeSectionStyles,
      items: prototypesTreeItems,
    }

    const withPrototypes =
      process.env.NODE_ENV !== 'production' ? treeItems.concat(prototypeTreeSection) : treeItems

    const componentTreeSection = {
      key: 'components',
      title: 'Components',
      styles: treeSectionStyles,
      items: treeItemsByType[0].items,
    }
    const behaviorTreeSection = {
      key: 'behaviour',
      title: 'Behaviors',
      styles: treeSectionStyles,
      items: treeItemsByType[1].items,
    }

    const withComponents = withPrototypes.concat(componentTreeSection)
    const allSections = withComponents.concat(behaviorTreeSection)

    const at = this.props.location.pathname
    const activeCategoryIndex = _.findIndex(
      allSections,
      (section: ShorthandValue<TreeItemProps>) => {
        return _.find((section as any).items, item => item.title.to === at)
      },
    )
    // TODO: remove after the issue with TreeItem will be fixed
    // https://github.com/stardust-ui/react/issues/1613
    this.addItemKeyCallbacks(allSections)

    const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
      <Component open={open} hasSubtree={hasSubtree} {...restProps}>
        <span>{content}</span>
        {hasSubtree && <Icon name={open ? 'stardust-arrow-up' : 'stardust-arrow-down'} />}
      </Component>
    )

    // TODO: bring back the active elements indicators
    return (
      <Provider
        theme={{
          componentStyles: {
            TreeTitle: {
              root: {
                display: 'block',
                width: '100%',
              },
            },
          },
        }}
      >
        <Segment styles={sidebarStyles}>
          <Segment styles={treeSectionStyles}>
            <Logo width="32px" styles={logoStyles} />
            <Text
              role="heading"
              aria-level={1}
              color="white"
              content="Stardust UI React &nbsp;"
              styles={logoStyles}
            />
            <Text color="white" content={pkg.version} size="medium" styles={logoStyles} />
          </Segment>
          <Tree
            defaultActiveIndex={activeCategoryIndex}
            items={allSections}
            renderItemTitle={titleRenderer}
          />
        </Segment>
      </Provider>
    )
  }
}

export default withRouter(Sidebar)
