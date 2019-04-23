import * as React from 'react'
import { Box, Header, Segment } from '@stardust-ui/react'

interface PrototypeSectionProps {
  title?: React.ReactNode
  style?: React.CSSProperties
}

interface ComponentPrototypeProps extends PrototypeSectionProps {
  description?: React.ReactNode
}

export const PrototypeSection: React.FC<ComponentPrototypeProps> = props => {
  const { title: title, children, style, ...rest } = props
  return (
    <Box styles={{ margin: '20px', ...style }} {...rest}>
      {title && <Header as="h1">{title}</Header>}
      {children}
    </Box>
  )
}

export const ComponentPrototype: React.FC<ComponentPrototypeProps> = props => {
  const { description, title: header, children, style, ...rest } = props
  return (
    <Box styles={{ marginTop: '20px', ...style }} {...rest}>
      {(header || description) && (
        <Segment>
          {header && <Header as="h3">{header}</Header>}
          {description && <p>{description}</p>}
        </Segment>
      )}
      <Segment>{children}</Segment>
    </Box>
  )
}
