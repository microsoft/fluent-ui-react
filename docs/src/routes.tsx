import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'
import MarkdownProvider, { renderPage } from './components/MarkdownProvider'

import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'
import * as QuickStart from './views/QuickStart.md'
import Accessibility from './views/Accessibility'
import Theming from './views/Theming'
import ThemingExamples from './views/ThemingExamples'
import Glossary from './views/Glossary'

const Router = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName" component={ExternalExampleLayout} />
      <Switch>
        <DocsLayout exact path="/" component={Introduction} />
        <DocsLayout exact path="/:type/:name" component={DocsRoot} sidebar />

        <MarkdownProvider>
          <DocsLayout exact path="/quick-start" component={renderPage(QuickStart)} />
        </MarkdownProvider>
        {process.env.NODE_ENV !== 'production' && (
          <DocsLayout
            exact
            path="/prototype-chat-pane"
            component={require('./prototypes/chatPane/index').default}
          />
        )}
        <DocsLayout exact path="/glossary" component={Glossary} />
        <DocsLayout exact path="/accessibility" component={Accessibility} />
        <DocsLayout exact path="/theming" component={Theming} />
        <DocsLayout exact path="/theming-examples" component={ThemingExamples} />
        <DocsLayout exact path="/*" component={PageNotFound} />
      </Switch>
    </Switch>
  </BrowserRouter>
)

export default Router
