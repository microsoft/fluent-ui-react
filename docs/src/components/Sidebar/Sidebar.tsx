import keyboardKey from 'keyboard-key'
import * as _ from 'lodash/fp'
import PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Input as SemanticUIInput } from 'semantic-ui-react'
import { Menu, Icon } from '@stardust-ui/react'

import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import { white, black } from 'src/themes/teams/siteVariables'
import { constants } from 'src/lib'

type ComponentMenuItem = { displayName: string; type: string }

const pkg = require('../../../../package.json')
const componentMenu: ComponentMenuItem[] = require('docs/src/componentMenu')
const behaviorMenu: ComponentMenuItem[] = require('docs/src/behaviorMenu')

const selectedItemLabelStyle: any = { color: '#35bdb2', float: 'right' }
const flexDislayStyle: any = { color: white, display: 'flex' }
const selectedItemLabel = <span style={selectedItemLabelStyle}>Press Enter</span>

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
    if (document.activeElement === this._searchInput) this._searchInput.blur()
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
          activeClassName="active"
          styles={{ color: '#979593', background: black, padding: '0px' }}
        />
      )),
    )([...componentMenu, ...behaviorMenu])

    return (
      <Menu.Item
        key={nextType}
        content={
          <div>
            {_.capitalize(nextType)}s
            <Menu vertical items={items} styles={{ color: white, background: black }} pills />
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
          to={getComponentPathname(info)}
          styles={{ padding: '0px' }}
        >
          {info.displayName}
          {isSelected && selectedItemLabel}
        </Menu.Item>
      )
    }, this.filteredMenu)

    return <Menu vertical styles={{ color: white, background: black }} pills items={menuItems} />
  }

  render() {
    const { style } = this.props
    const { query } = this.state
    return (
      <Menu
        vertical
        styles={{
          color: white,
          background: black,
          ...style,
        }}
        pills
      >
        <Menu.Item>
          <Logo spaced="right" width="48px" />
          <strong>
            Stardust UI React &nbsp;
            <small>
              <em>{pkg.version}</em>
            </small>
          </strong>
          <Menu
            vertical
            pills
            styles={{ color: white, background: black }}
            items={[
              {
                key: 'github',
                content: (
                  <div style={flexDislayStyle}>
                    GitHub<Icon name="chess rook" styles={{ textAlign: 'right', width: '100%' }} />
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
                    CHANGELOG<Icon
                      name="file alternate outline"
                      styles={{ textAlign: 'right', width: '100%' }}
                    />
                  </div>
                ),
                href: '${constants.repoURL}/blob/master/CHANGELOG.md',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            ]}
          />
        </Menu.Item>
        <Menu.Item as="NavLink" exact to="/" activeClassName="active" content="Introduction" />
        <Menu.Item>
          Guides
          <Menu
            vertical
            styles={{ color: white, background: black }}
            pills
            items={[
              { key: 'quickstart', content: <NavLink to="/quick-start">QuickStart</NavLink> },
              {
                key: 'accessiblity',
                content: <NavLink to="/accessibility">Accessibility</NavLink>,
              },
            ]}
          />
        </Menu.Item>
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
