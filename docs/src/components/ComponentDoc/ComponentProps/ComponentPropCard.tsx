import * as React from 'react'
import ComponentTableProps from '../ComponentPropsTable'
import { Divider, Segment } from '@stardust-ui/react/src'

export const cardStyle: React.CSSProperties = {
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
}

type ComponentPropCardProps = {
  name: string
  description: string
}

export class ComponentPropCard extends React.Component<ComponentPropCardProps> {
  render() {
    const { name, description } = this.props
    return (
      <Segment styles={cardStyle}>
        <div>{description}</div>
        <Divider />
        <ComponentTableProps componentName={name} />
      </Segment>
    )
  }
}
