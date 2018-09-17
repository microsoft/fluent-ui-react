import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'

import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'
import QuickStart from './views/QuickStart'

const Router = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName" component={ExternalExampleLayout} />
      <Switch>
        <DocsLayout exact path="/" component={Introduction} />
        <DocsLayout exact path="/:type/:name" component={DocsRoot} sidebar />
        <DocsLayout exact path="/quick-start" component={QuickStart} />
        <DocsLayout exact path="/*" component={PageNotFound} />
      </Switch>
    </Switch>
  </BrowserRouter>
)

export default Router
