import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Segment } from '@stardust-ui/react'

import Logo from '../components/Logo/Logo'

const pkg = require('package.json')

const Introduction = () => (
  <div>
    <Segment basic textAlign="center">
      <Logo centered size="small" />
      <Header as="h1" textAlign="center">
        {_.capitalize(pkg.name)}
        <Header.Description>{pkg.description}</Header.Description>
      </Header>
    </Segment>
    <p>
      Stardust UI provides extensible vanilla JavaScript solutions to component state, styling, and
      accessibility. These powerful features are exposed behind simple APIs based on natural
      language.
    </p>
    <p>
      Stardust UI React is being built as an exemplar of the Stardust UI design language, component
      specifications, and utilities.
    </p>

    <h3>Learn</h3>
    <p>
      The best place to start is with the <NavLink to="shorthand-props">Shorthand Props</NavLink>{' '}
      concept.
    </p>

    <h3>Start</h3>
    <p>
      If you want to get going right away, see the <NavLink to="quick-start">Quick Start</NavLink>{' '}
      guide.
    </p>
  </div>
)

export default Introduction
