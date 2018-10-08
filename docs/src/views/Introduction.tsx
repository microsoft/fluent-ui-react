import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import Editor from 'docs/src/components/Editor'
import { Container, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react'
import Logo from '../components/Logo/Logo'

const pkg = require('package.json')

const Comparison: any = ({ jsx, html }) => (
  <Segment className="code-example">
    <Grid columns="equal" centered textAlign="left">
      <Grid.Column computer="8" largeScreen="7" widescreen="7" width="16">
        <Label size="tiny" attached="top left">
          JSX
        </Label>
        <Editor id={btoa(jsx)} value={jsx} readOnly />
      </Grid.Column>
      <Grid.Column largeScreen="2" only="large screen" textAlign="center">
        <Divider vertical>
          <Icon name={'right arrow circle' as any} />
        </Divider>
      </Grid.Column>
      <Grid.Column computer="8" largeScreen="7" widescreen="7" width="16">
        <Label size="tiny" attached="top right">
          Rendered HTML
        </Label>
        <Editor id={btoa(html)} mode="html" value={html} readOnly />
      </Grid.Column>
    </Grid>
  </Segment>
)

Comparison.propTypes = {
  jsx: PropTypes.string,
  html: PropTypes.string,
}

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
