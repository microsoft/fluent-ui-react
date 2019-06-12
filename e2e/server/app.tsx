import * as React from 'react'
import * as ReactDOM from 'react-dom'
import _ from 'lodash'
import E2EExample from './E2EExample'
import routes from './routes'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Provider, themes, Flex, Header, List } from '@stardust-ui/react'

const ContentList = () => (
  <>
    <Flex column hAlign="center">
      <Header as="h1" content="E2E Test Examples" />
      <List
        items={_.keys(routes).map(testExampleUrl => ({
          key: testExampleUrl,
          header: { as: Link, to: testExampleUrl, content: _.startCase(testExampleUrl) },
        }))}
      />
    </Flex>
  </>
)

const App = () => (
  <BrowserRouter>
    <Provider theme={themes.teams}>
      <Switch>
        <Route exact path="/:exampleName" component={E2EExample} />
        <Route component={ContentList} />
      </Switch>
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
