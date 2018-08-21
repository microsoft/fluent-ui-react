import * as React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { behaviorType } from 'docs/src/constants'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'
import DocsBehaviorRoot from './components/DocsBehaviorRoot'

import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'

const Router = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName" component={ExternalExampleLayout} />
      <Switch>
        <DocsLayout exact path="/" component={Introduction} />
        <DocsLayout
          exact
          path={`/${behaviorType}s/:name`}
          type="testingType"
          component={DocsBehaviorRoot}
          sidebar
        />
        <DocsLayout exact path="/:type/:name" component={DocsRoot} sidebar />
        <DocsLayout exact path="/*" component={PageNotFound} />
      </Switch>
    </Switch>
  </BrowserRouter>
)

export default Router
