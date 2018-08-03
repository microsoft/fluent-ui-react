import React from 'react'
import { Container } from 'semantic-ui-react'
import { Header, Divider } from '@stardust-ui/react'

const ComponentAnatomy = props => (
  <Container text>
    <Divider hidden />

    <Header as="h1" textAlign="center">
      Component Anatomy
    </Header>

    <Header as="h2">Components</Header>
    <p>...</p>

    <Header as="h2">Parts</Header>
    <p>
      Components are made of parts. Example, a Button can contain an icon. We call the definition of
      a component and its parts the component's anatomy.
    </p>
    <p>All parts of a component are represented in the component's anatomy.</p>

    <Header as="h2">Styling</Header>
    <p>
      Components are styled according to their anatomy. Each component part is assigned a style.
    </p>
    <p>
      Component styles are flat objects. They do not prescribe structure. They only define component
      parts. This allows the component implementation to decide the layout of the component.
    </p>
  </Container>
)

export default ComponentAnatomy
