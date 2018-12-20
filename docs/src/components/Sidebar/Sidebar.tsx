import keyboardKey from 'keyboard-key'
import * as _ from 'lodash/fp'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Icon, Input as SemanticUIInput, Menu } from 'semantic-ui-react'

import Logo from 'docs/src/components/Logo/Logo'
import { getComponentPathname } from 'docs/src/utils'
import { themes } from '@stardust-ui/react'
import { ThemeContext } from '../../context/theme-context'
import { constants } from 'src/lib'

type ComponentMenuItem = { displayName: string; type: string }

const pkg = require('../../../../package.json')
const componentMenu: ComponentMenuItem[] = require('docs/src/componentMenu')
const behaviorMenu: ComponentMenuItem[] = require('docs/src/behaviorMenu')

const selectedItemLabelStyle: any = { color: '#35bdb2', float: 'right' }
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
          name={info.displayName}
          onClick={this.handleItemClick}
          as={NavLink}
          to={getComponentPathname(info)}
          activeClassName="active"
        />
      )),
    )([...componentMenu, ...behaviorMenu])

    return (
      <Menu.Item key={nextType}>
        <Menu.Header>{_.capitalize(nextType)}s</Menu.Header>
        <Menu.Menu>{items}</Menu.Menu>
      </Menu.Item>
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
    }, this.filteredMenu)

    return <Menu.Menu>{menuItems}</Menu.Menu>
  }

  render() {
    const { style } = this.props
    const { query } = this.state
    return (
      <ThemeContext.Consumer>
        {({ themeName, changeTheme }) => (
          <Menu vertical fixed="left" inverted style={{ ...style }}>
            <Menu.Item>
              <Logo spaced="right" size="mini" />
              <strong>
                Stardust UI React &nbsp;
                <small>
                  <em>{pkg.version}</em>
                </small>
              </strong>
              <Menu.Menu>
                <Menu.Item
                  as="a"
                  href={constants.repoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" /> GitHub
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href={`${constants.repoURL}/blob/master/CHANGELOG.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="file alternate outline" /> CHANGELOG
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
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
            <Menu.Item>
              Concepts
              <Menu.Menu>
                <Menu.Item as={NavLink} exact to="/" activeClassName="active">
                  Introduction
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/color-palette" activeClassName="active">
                  Color Palette
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/shorthand-props" activeClassName="active">
                  Shorthand Props
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              Guides
              <Menu.Menu>
                <Menu.Item as={NavLink} exact to="/quick-start" activeClassName="active">
                  Quick Start
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/accessibility" activeClassName="active">
                  Accessibility
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/theming" activeClassName="active">
                  Theming
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/theming-examples" activeClassName="active">
                  Theming Examples
                </Menu.Item>
                <Menu.Item
                  as={NavLink}
                  exact
                  to="/integrate-custom-components"
                  activeClassName="active"
                >
                  Integrate Custom Components
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            {process.env.NODE_ENV !== 'production' && (
              <Menu.Item>
                Prototypes
                <Menu.Menu>
                  <Menu.Item as={NavLink} exact to="/prototype-chat-pane" activeClassName="active">
                    Chat Pane
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/prototype-chat-message-with-popover"
                    activeClassName="active"
                  >
                    Chat message with popover
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/prototype-async-shorthand"
                    activeClassName="active"
                  >
                    Async Shorthand
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/prototype-employee-card"
                    activeClassName="active"
                  >
                    Employee Card
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/prototype-meeting-options"
                    activeClassName="active"
                  >
                    Meeting Options
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/prototype-search-page"
                    activeClassName="active"
                  >
                    Search Page
                  </Menu.Item>
                  <Menu.Item as={NavLink} exact to="/prototype-popups" activeClassName="active">
                    Popups
                  </Menu.Item>
                  <Menu.Item as={NavLink} exact to="/icon-viewer" activeClassName="active">
                    Processed Icons
                  </Menu.Item>
                </Menu.Menu>
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
    )
  }

  private getThemeOptions = () => {
    return Object.keys(themes).map(key => ({
      text: _.startCase(key),
      value: key,
    }))
  }
}

export default withRouter(Sidebar)
