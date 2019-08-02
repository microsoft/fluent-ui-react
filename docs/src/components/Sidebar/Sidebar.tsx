import {
  Icon,
  Tree,
  Segment,
  Text,
  ICSSInJSStyle,
  TreeItemProps,
  TreeProps,
  Flex,
  FlexItem,
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

  getTreeItems(): TreeProps['items'] {
    return [
      {
        key: 'concepts',
        title: 'Concepts',
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
          },
          {
            key: 'composition',
            title: {
              as: NavLink,
              content: 'Composition',
              activeClassName: 'active',
              to: '/composition',
            },
          },
          {
            key: 'shorthand',
            title: {
              as: NavLink,
              content: 'Shorthand Props',
              activeClassName: 'active',
              to: '/shorthand-props',
            },
          },
        ],
      },
      {
        key: 'guides',
        title: 'Guides',
        items: [
          {
            key: 'quickstart',
            title: {
              content: 'QuickStart',
              as: NavLink,
              activeClassName: 'active',
              to: '/quick-start',
            },
          },
          {
            key: 'faq',
            title: { content: 'FAQ', as: NavLink, activeClassName: 'active', to: '/faq' },
          },
          {
            key: 'accessiblity',
            title: {
              content: 'Accessibility',
              as: NavLink,
              activeClassName: 'active',
              to: '/accessibility',
            },
          },
          {
            key: 'theming',
            title: { content: 'Theming', as: NavLink, activeClassName: 'active', to: '/theming' },
          },
          {
            key: 'theming-examples',
            title: {
              content: 'Theming Examples',
              as: NavLink,
              activeClassName: 'active',
              to: '/theming-examples',
            },
          },
          {
            key: 'colorpalette',
            title: { content: 'Colors', as: NavLink, activeClassName: 'active', to: '/colors' },
          },
          {
            key: 'layout',
            title: { content: 'Layout', as: NavLink, activeClassName: 'active', to: '/layout' },
          },
          {
            key: 'integrate-custom',
            title: {
              content: 'Integrate Custom Components',
              as: NavLink,
              activeClassName: 'active',
              to: '/integrate-custom-components',
            },
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

  getSectionsWithPrototypeSectionIfApplicable(currentSections, allPrototypes) {
    let prototypes =
      process.env.NODE_ENV === 'production'
        ? _.filter(allPrototypes, { public: true })
        : allPrototypes

    if (prototypes.length === 0) {
      return currentSections
    }
    prototypes = this.removePublicTags(prototypes)
    const prototypeTreeSection = {
      key: 'prototypes',
      title: 'Prototypes',
      items: prototypes,
    }
    return currentSections.concat(prototypeTreeSection)
  }

  removePublicTags(prototyptesTreeItems) {
    return prototyptesTreeItems.map(p => {
      delete p.public
      return p
    })
  }

  render() {
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

    const logoStyles: ICSSInJSStyle = {
      paddingRight: '5px',
      color: 'white',
      fontWeight: 700,
    }

    const flexDisplayStyle: any = { width: `${parseInt(this.props.width, 10) - 50}px` }

    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`

    const treeItemsByType = _.map(constants.typeOrder, nextType => {
      const items = _.chain([...componentMenu, ...behaviorMenu])
        .filter(({ type }) => type === nextType)
        .map(info => ({
          key: info.displayName.concat(nextType),
          title: { content: info.displayName, as: NavLink, to: getComponentPathname(info) },
          onClick: this.handleItemClick,
        }))
        .value()

      return { items }
    })

    const topTreeItems: TreeProps['items'] = [
      {
        key: 'github',
        title: {
          content: (
            <Flex style={flexDisplayStyle}>
              GitHub
              <FlexItem push>
                <Icon name="github" />
              </FlexItem>
            </Flex>
          ),
          href: constants.repoURL,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
      {
        key: 'change',
        title: {
          content: (
            <Flex style={flexDisplayStyle}>
              CHANGELOG
              <FlexItem push>
                <Icon name="file alternate outline" />
              </FlexItem>
            </Flex>
          ),
          href: changeLogUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
    ]

    const treeItems = topTreeItems.concat(this.getTreeItems())

    const prototypesTreeItems: (ShorthandValue<{}> & { key: string; public: boolean })[] = [
      {
        key: 'chatpane',
        title: { content: 'Chat Pane', as: NavLink, to: '/prototype-chat-pane' },
        public: false,
      },
      {
        key: 'chatMssages',
        title: { content: 'Chat Messages', as: NavLink, to: '/prototype-chat-messages' },
        public: false,
      },
      {
        key: 'customtoolbar',
        title: { content: 'Custom Styled Toolbar', as: NavLink, to: '/prototype-custom-toolbar' },
        public: false,
      },
      {
        key: 'dropdowns',
        title: { content: 'Dropdowns', as: NavLink, to: '/prototype-dropdowns' },
        public: false,
      },
      {
        key: 'alerts',
        title: { content: 'Alerts', as: NavLink, to: '/prototype-alerts' },
        public: false,
      },
      {
        key: 'asyncshorthand',
        title: { content: 'Async Shorthand', as: NavLink, to: '/prototype-async-shorthand' },
        public: false,
      },
      {
        key: 'employeecard',
        title: { content: 'Employee Card', as: NavLink, to: '/prototype-employee-card' },
        public: false,
      },
      {
        key: 'meetingoptions',
        title: { content: 'Meeting Options', as: NavLink, to: '/prototype-meeting-options' },
        public: false,
      },
      {
        key: 'mentions',
        title: { content: 'Mentions', as: NavLink, to: '/prototype-mentions' },
        public: false,
      },
      {
        key: 'searchpage',
        title: { content: 'Search Page', as: NavLink, to: '/prototype-search-page' },
        public: false,
      },
      {
        key: 'popups',
        title: { content: 'Popups', as: NavLink, to: '/prototype-popups' },
        public: false,
      },
      {
        key: 'iconviewer',
        title: { content: 'Processed Icons', as: NavLink, to: '/icon-viewer' },
        public: false,
      },
      {
        key: 'menu-button',
        title: { content: 'MenuButton', as: NavLink, to: '/menu-button' },
        public: false,
      },
      {
        key: 'loader-button',
        title: { content: 'Loader button', as: NavLink, to: '/loader-button' },
        public: true,
      },
    ]

    const componentTreeSection = {
      key: 'components',
      title: 'Components',
      items: treeItemsByType[0].items,
    }
    const behaviorTreeSection = {
      key: 'behaviour',
      title: 'Behaviors',
      items: treeItemsByType[1].items,
    }

    const withComponents = treeItems.concat(componentTreeSection)
    const withBehaviors = withComponents.concat(behaviorTreeSection)
    const allSections = this.getSectionsWithPrototypeSectionIfApplicable(
      withBehaviors,
      prototypesTreeItems,
    )

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
      <Segment styles={sidebarStyles}>
        <Segment>
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
    )
  }
}

export default withRouter(Sidebar)
