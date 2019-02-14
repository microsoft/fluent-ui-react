import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Header, Segment } from 'semantic-ui-react'

import pkg from '../../../packages/react/package.json'
import Logo from '../components/Logo/Logo'

const Introduction = () => (
  <Container id="introduction-page" text>
    <Segment basic textAlign="center">
      <Logo centered size="small" />
      <Header as="h1" textAlign="center">
        {_.capitalize(pkg.name)}
        <Header.Subheader>{pkg.description}</Header.Subheader>
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
  </Container>
)

export default Introduction
