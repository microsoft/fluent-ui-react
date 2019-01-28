import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Segment, ICSSInJSStyle, Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../../src/lib'
import Logo from '../components/Logo/Logo'

const pkg = require('package.json')
const centerAligned: ICSSInJSStyle = {
  textAlign: 'center',
  padding: '14px',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}

const Introduction = () => (
  <Provider
    theme={mergeThemes(themes.teams, {
      componentStyles: {
        Header: {
          root: {
            marginTop: '24px',
            marginBottom: '0px',
          },
        },
        HeaderDescription: {
          root: {
            margin: 0,
            fontSize: '1.14285714rem',
          },
        },
      },
    })}
  >
    <div style={{ margin: '0 225px', fontSize: '1.15rem', maxWidth: '80ch' }}>
      <Segment styles={centerAligned}>
        <Logo width="150px" />
        <Header as="h1">
          {_.capitalize(pkg.name)}
          <Header.Description>{pkg.description}</Header.Description>
        </Header>
      </Segment>
      <p>
        Stardust UI provides extensible vanilla JavaScript solutions to component state, styling,
        and accessibility. These powerful features are exposed behind simple APIs based on natural
        language.
      </p>
      <p>
        Stardust UI React is being built as an exemplar of the Stardust UI design language,
        component specifications, and utilities.
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
  </Provider>
)

export default Introduction
