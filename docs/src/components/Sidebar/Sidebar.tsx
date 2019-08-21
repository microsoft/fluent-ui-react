import {
  Icon,
  HierarchicalTree,
  Segment,
  Text,
  ICSSInJSStyle,
  HierarchicalTreeItemProps,
  HierarchicalTreeProps,
  Input,
  Flex,
  Box,
  HierarchicalTreeTitleProps,
} from '@stardust-ui/react'
import { ShorthandValue } from '../../../../packages/react/src/types'
import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { NavLink, NavLinkProps, withRouter } from 'react-router-dom'

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
  state: any = { query: '', activeCategoryIndex: 0 }
  searchInputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown)

    const at = this.props.location.pathname
    const categoryIndex = this.findActiveCategoryIndex(at, this.getSectionsWithoutSearchFilter())
    this.setState({ activeCategoryIndex: categoryIndex })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  findActiveCategoryIndex = (at: string, sections: ShorthandValue<any>[]): number => {
    let newAt = at
    if (at.startsWith('/components')) {
      newAt = newAt.replace(/[^\/]*$/, '')
    }
    if (newAt[newAt.length - 1] === '/') {
      newAt = newAt.substr(0, newAt.length - 1)
    }

    return _.findIndex(sections, (section: ShorthandValue<HierarchicalTreeItemProps>) => {
      return _.find((section as any).items, item => item.title.to.startsWith(newAt))
    })
  }

  handleDocumentKeyDown = e => {
    const code = keyboardKey.getCode(e)
    const isAZ = code >= 65 && code <= 90
    const hasModifier = e.altKey || e.ctrlKey || e.metaKey
    const bodyHasFocus = document.activeElement === document.body

    if (!hasModifier && isAZ && bodyHasFocus) this.searchInputRef.current.focus()
  }

  handleItemClick = (e: React.SyntheticEvent, data: HierarchicalTreeItemProps) => {
    const { query } = this.state

    if (query) {
      this.setState({ query: '' })
      const at = (data.title as NavLinkProps).to as string
      const categoryIndex = this.findActiveCategoryIndex(at, this.getSectionsWithoutSearchFilter())
      this.setState({ activeCategoryIndex: categoryIndex })
    }
  }

  treeActiveIndexChanged = (e: React.SyntheticEvent, props: HierarchicalTreeProps) => {
    this.setState({ activeCategoryIndex: props.activeIndex })
  }

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

  addItemOnClickCallbacks(sections: ShorthandValue<any>[]) {
    for (let i = 0; i < sections.length; i++) {
      const category = sections[i]
      if ('items' in category) {
        this.addItemOnClickCallbacks(category.items)
      } else {
        if (!('title' in category)) {
          continue
        }
        category['onTitleClick'] = (e, data) => {
          this.handleItemClick(e, data)
        }
      }
    }
  }

  getTreeItems(): HierarchicalTreeProps['items'] {
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

  handleQueryChange = (e, data) => {
    this.setState({ query: data.value })
  }

  getSectionsWithoutSearchFilter = (): HierarchicalTreeItemProps[] => {
    const treeItemsByType = _.map(constants.typeOrder, nextType => {
      const items = _.chain([...componentMenu, ...behaviorMenu])
        .filter(({ type }) => type === nextType)
        .map(info => ({
          key: info.displayName.concat(nextType),
          title: { content: info.displayName, as: NavLink, to: getComponentPathname(info) },
        }))
        .value()

      return { items }
    })

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
        public: true,
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
        key: 'nested-popups-and-dialogs',
        title: {
          content: 'Nested Popups & Dialogs',
          as: NavLink,
          to: '/prototype-nested-popups-and-dialogs',
        },
        public: true,
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
    ]

    const componentTreeSection = {
      key: 'components',
      title: 'Components',
      items: treeItemsByType[0].items,
    }

    const treeItems = this.getTreeItems()
    const withComponents = treeItems.concat(componentTreeSection)
    return this.getSectionsWithPrototypeSectionIfApplicable(withComponents, prototypesTreeItems)
  }

  render() {
    const sidebarStyles: ICSSInJSStyle = {
      background: '#201f1f',
      width: `${this.props.width}px`,
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

    const changeLogUrl: string = `${constants.repoURL}/blob/master/CHANGELOG.md`
    const allSectionsWithoutSearchFilter = this.getSectionsWithoutSearchFilter()

    const escapedQuery = _.escapeRegExp(this.state.query)
    const regexQuery = new RegExp(`^${escapedQuery}`, 'i')
    const allSectionsWithPossibleEmptySections = _.map(
      allSectionsWithoutSearchFilter,
      (section: HierarchicalTreeItemProps) => {
        return {
          ...section,
          items: _.filter(section.items as HierarchicalTreeItemProps[], item =>
            regexQuery.test((item.title as HierarchicalTreeTitleProps).content as string),
          ),
        }
      },
    )

    let allSections = _.filter(
      allSectionsWithPossibleEmptySections,
      (section: HierarchicalTreeItemProps) =>
        Array.isArray(section.items) && section.items.length > 0,
    )

    if (this.state.query !== '') {
      allSections = _.map(allSections, (section: HierarchicalTreeItemProps) => {
        return { ...section, open: true }
      })
    }

    // TODO: remove after the issue with TreeItem will be fixed
    // https://github.com/stardust-ui/react/issues/1613
    this.addItemKeyCallbacks(allSections)

    this.addItemOnClickCallbacks(allSections)

    const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
      <Component open={open} hasSubtree={hasSubtree} {...restProps}>
        <span>{content}</span>
        {hasSubtree && this.state.query === '' && (
          <Icon name={open ? 'stardust-arrow-up' : 'stardust-arrow-down'} />
        )}
      </Component>
    )

    const topItemTheme = {
      ...this.props.treeItemStyle,
      padding: undefined,
      margin: '0.5em 0em 0.5em 1em',
      width: `${0.9 * this.props.width}px`,
    }

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
        <Flex column>
          <a
            href={constants.repoURL}
            target="_blank"
            rel="noopener noreferrer"
            style={topItemTheme}
          >
            <Box>
              GitHub
              <Icon name="github" styles={{ float: 'right' }} />
            </Box>
          </a>
          <a href={changeLogUrl} target="_blank" rel="noopener noreferrer" style={topItemTheme}>
            <Box>
              CHANGELOG
              <Icon name="file alternate outline" styles={{ float: 'right' }} />
            </Box>
          </a>
          <Input
            styles={topItemTheme}
            fluid
            clearable
            icon="search"
            placeholder="Search"
            iconPosition="end"
            role="search"
            onChange={this.handleQueryChange}
            value={this.state.query}
            inputRef={this.searchInputRef}
          />
        </Flex>
        <HierarchicalTree
          items={allSections}
          renderItemTitle={titleRenderer}
          activeIndex={this.state.activeCategoryIndex}
          onActiveIndexChange={this.treeActiveIndexChanged}
        />
      </Segment>
    )
  }
}

export default withRouter(Sidebar)
