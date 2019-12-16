import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import CustomScrollbarPrototype from './prototypes/customScrollbar'

const Routes = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Route exact path="/prototype-custom-scrollbar" component={CustomScrollbarPrototype} />
  </BrowserRouter>
)

export default Routes
