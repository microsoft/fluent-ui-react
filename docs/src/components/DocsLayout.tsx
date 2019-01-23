import AnchorJS from 'anchor-js'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import Sidebar from 'docs/src/components/Sidebar/Sidebar'
import style from 'docs/src/Style'
import { scrollToAnchor } from 'docs/src/utils'
import { getUnhandledProps, mergeThemes } from 'src/lib'
import { Provider, themes } from '@stardust-ui/react'

const anchors = new AnchorJS({
  icon: '#',
})

class DocsLayout extends React.Component<any, any> {
  scrollStartTimeout: any
  pathname: any

  static propTypes = {
    component: PropTypes.func,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    render: PropTypes.func,
    sidebar: PropTypes.bool,
  }

  static handledProps = ['component', 'history', 'location', 'match', 'render', 'sidebar']

  componentDidMount() {
    this.resetPage()
  }

  componentDidUpdate() {
    this.resetPage()
  }

  componentWillUnmount() {
    clearTimeout(this.scrollStartTimeout)
  }

  resetPage = () => {
    const { location } = this.props
    // only reset the page when changing routes
    if (this.pathname === location.pathname) return

    clearTimeout(this.scrollStartTimeout)

    scrollTo(0, 0)

    anchors.add('h2, h3, h4, h5, h6')
    anchors.remove([1, 2, 3, 4, 5, 6].map(n => `.rendered-example h${n}`).join(', '))
    anchors.remove('.no-anchor')

    this.scrollStartTimeout = setTimeout(scrollToAnchor, 500)
    this.pathname = location.pathname
  }

  renderChildren = props => {
    const { component: Children, render, sidebar } = this.props
    const mainStyle = sidebar ? style.sidebarMain : style.main

    if (render) return render()
    return (
      <div style={style.container}>
        <Provider
          theme={mergeThemes(themes.teamsDark, {
            // adjust Teams' theme to Semantic UI's font size scheme
            siteVariables: {},
            componentVariables: {
              MenuDivider: {
                borderColor: '#ffffff80',
              },
              MenuItem: {
                activeBackgroundColor: 'none',
                focusedBackgroundColor: 'none',
              },
            },
            componentStyles: {
              MenuItem: {
                root: {
                  padding: '.5em 1.33333333em',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#ffffff80',
                  ':hover, :focus': {
                    color: 'white',
                    fontWeight: '',
                    backgroundColor: 'none',
                  },
                },
              },
              MenuDivider: {
                root: {
                  marginTop: '.5em',
                  paddingBottom: '.5em',
                },
              },
            },
          })}
        >
          <Sidebar style={style.menu} />
        </Provider>
        <div style={mainStyle}>
          <Children {...props} />
        </div>
      </div>
    )
  }

  render() {
    const unhandledProps = getUnhandledProps(DocsLayout, this.props)

    return <Route {...unhandledProps} render={this.renderChildren} />
  }
}

export default withRouter(DocsLayout)
