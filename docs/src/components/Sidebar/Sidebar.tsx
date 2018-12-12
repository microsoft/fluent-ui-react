import keyboardKey from 'keyboard-key'
import * as _ from 'lodash/fp'
import PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Menu, Icon, Text, Segment, Input } from '@stardust-ui/react'

import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import { constants } from 'src/lib'

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

  private handleSearchChange = e =>
    this.setState({
      selectedItemIndex: 0,
      query: e.target.value,
    })

  private handleSearchKeyDown = e => {
    const { history } = this.props
    const { selectedItemIndex } = this.state
    const code = keyboardKey.getCode(e)

    if (code === keyboardKey.Enter && this.selectedRoute) {
      e.preventDefault()
      history.push(this.selectedRoute)
      this.selectedRoute = null
      this._searchInput.blur()
      this.setState({ query: '' })
    }

    if (code === keyboardKey.ArrowDown) {
      e.preventDefault()
      const next = _.min([selectedItemIndex + 1, this.filteredMenu.length - 1])
      this.selectedRoute = getComponentPathname(this.filteredMenu[next])
      this.setState({ selectedItemIndex: next })
    }

    if (code === keyboardKey.ArrowUp) {
      e.preventDefault()
      const next = _.max([selectedItemIndex - 1, 0])
      this.selectedRoute = getComponentPathname(this.filteredMenu[next])
      this.setState({ selectedItemIndex: next })
    }
  }

  private menuItemsByType = _.map(nextType => {
    const items = _.flow(
      _.filter<ComponentMenuItem>(({ type }) => type === nextType),
      _.map(info => (
        <Menu.Item
          key={info.displayName}
          content={info.displayName}
          onClick={this.handleItemClick}
          as={NavLink}
          to={getComponentPathname(info)}
        />
      )),
    )([...componentMenu, ...behaviorMenu])

    return (
      <Menu.Item
        key={nextType}
        content={
          <div>
            {_.capitalize(nextType)}s
            <Menu vertical items={items} pills />
          </div>
        }
      />
    )
  }, constants.typeOrder)

  private renderSearchItems = () => {
    const { selectedItemIndex, query } = this.state
    if (!query) return undefined

    let itemIndex = -1
    const startsWithMatches: ComponentMenuItem[] = []
    const containsMatches: ComponentMenuItem[] = []
    const escapedQuery = _.escapeRegExp(query)

    _.each(info => {
      if (new RegExp(`^${escapedQuery}`, 'i').test(info.displayName)) {
        startsWithMatches.push(info)
      } else if (new RegExp(escapedQuery, 'i').test(info.displayName)) {
        containsMatches.push(info)
      }
    }, componentMenu)

    this.filteredMenu = [...startsWithMatches, ...containsMatches]
    const menuItems = _.map(info => {
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

    return <Menu vertical pills items={menuItems} />
  }

  render() {
    const { style } = this.props
    const { query } = this.state
    const changeLogUrl = '${constants.repoURL}/blob/master/CHANGELOG.md'

    return (
      <Segment
        content={
          <Menu
            vertical
            styles={{
              ...style,
            }}
            pills
          >
            <Menu.Item>
              <Logo spaced="right" width="48px" />
              <Text content="Stardust UI React &nbsp;" />
              <Text content={pkg.version} size="small" weight="bold" />

              <Menu
                vertical
                pills
                items={[
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
                  },
                ]}
              />
            </Menu.Item>
            <Menu.Item>
              Concepts
              <Menu
                vertical
                pills
                items={[
                  { key: 'intro', content: 'Introduction', as: NavLink, to: '/' },
                  { key: 'color', content: 'Color Palette', as: NavLink, to: '/color-palette' },
                  {
                    key: 'shorthand',
                    content: 'Shorthand Props',
                    as: NavLink,
                    to: '/shorthand-props',
                  },
                ]}
              />
            </Menu.Item>
            <Menu.Item>
              Guides
              <Menu
                vertical
                pills
                items={[
                  { key: 'quickstart', content: 'QuickStart', as: NavLink, to: '/quick-start' },
                  {
                    key: 'accessiblity',
                    content: 'Accessibility',
                    as: NavLink,
                    to: '/accessibility',
                  },
                ]}
              />
            </Menu.Item>
            <Menu.Item active>
              <Input
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
