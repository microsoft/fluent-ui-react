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
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../src/lib'
import { semanticCssOverrides } from './Style'
import { inject, observer } from 'mobx-react'
import { AppStateStore } from './data/models'

const semanticStyleOverrides = {
  staticStyles: [semanticCssOverrides],
}

@inject((appState: AppStateStore) => ({
  themeStore: appState.themeStore,
}))
@observer
class Router extends React.Component<any, any> {
  render() {
    const { themeStore } = this.props
    const theme = themes[themeStore.themeName]
    return (
      <Provider
        theme={mergeThemes(semanticStyleOverrides, theme, {
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
              <DocsLayout exact path="/accessibility" component={Accessibility} />
              <DocsLayout exact path="/theming" component={Theming} />
              <DocsLayout exact path="/theming-examples" component={ThemingExamples} />
              <DocsLayout exact path="/*" component={PageNotFound} />
            </Switch>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router
