import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'

import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'
import QuickStart from './views/QuickStart'
import Accessibility from './views/Accessibility'
import Theming from './views/Theming'
import ThemingExamples from './views/ThemingExamples'
import Glossary from './views/Glossary'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../src/lib'
import { semanticCssOverrides } from './Style'
import { ThemeContext } from './context/theme-context'

const semanticStyleOverrides = {
  staticStyles: [semanticCssOverrides],
}

interface IRouterState {
  themeName: string
  changeTheme: (newTheme: string) => void
}

class Router extends React.Component<any, IRouterState> {
  private changeTheme

  constructor(props) {
    super(props)

    this.changeTheme = newTheme => {
      this.setState({
        themeName: newTheme,
      })
    }

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      themeName: 'teams',
      changeTheme: this.changeTheme,
    }
  }
  render() {
    const { themeName } = this.state
    return (
      <ThemeContext.Provider value={this.state}>
        <Provider
          theme={mergeThemes(semanticStyleOverrides, themes[themeName], {
            // adjust Teams' theme to Semantic UI's font size scheme
            siteVariables: {
              htmlFontSize: '14px',
              bodyFontSize: '1rem',
            },
          })}
        >
          <BrowserRouter basename={__BASENAME__}>
            <Switch>
              <Route exact path="/maximize/:exampleName" component={ExternalExampleLayout} />
              <Switch>
                <DocsLayout exact path="/" component={Introduction} />
                <DocsLayout exact path="/:type/:name" component={DocsRoot} sidebar />
                <DocsLayout exact path="/quick-start" component={QuickStart} />
                <DocsLayout exact path="/glossary" component={Glossary} />
                <DocsLayout exact path="/accessibility" component={Accessibility} />
                <DocsLayout exact path="/theming" component={Theming} />
                <DocsLayout exact path="/theming-examples" component={ThemingExamples} />
                <DocsLayout exact path="/*" component={PageNotFound} />
              </Switch>
            </Switch>
          </BrowserRouter>
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default Router
