import * as React from 'react'
import * as ReactDOM from 'react-dom'
import E2EExample from './E2EExample'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider, themes } from '@stardust-ui/react'

const App = () => (
  <BrowserRouter>
    <Provider theme={themes.teams}>
      <Route exact path="/e2e/:exampleName" component={E2EExample} />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
