import * as React from 'react'
import { Box, Header, Segment } from '@stardust-ui/react'

interface PrototypeSectionProps {
  title?: string
}

interface ComponentPrototypeProps extends PrototypeSectionProps {
  description?: string
}

export const PrototypeSection: React.FC<ComponentPrototypeProps> = props => (
  <Box style={{ margin: 20 }}>
    {props.title && <Header as="h1">{props.title}</Header>}
    {props.children}
  </Box>
)

export const ComponentPrototype: React.FC<ComponentPrototypeProps> = props => (
  <Box style={{ marginTop: 20 }}>
    {(props.title || props.description) && (
      <Segment>
        {props.title && <Header as="h3">{props.title}</Header>}
        {props.description && <p>{props.description}</p>}
      </Segment>
    )}
    <Segment>{props.children}</Segment>
  </Box>
)
