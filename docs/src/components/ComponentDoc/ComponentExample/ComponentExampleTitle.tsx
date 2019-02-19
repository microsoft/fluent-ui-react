import * as React from 'react'
import { Header } from '@stardust-ui/react'

const titleStyle = {
  margin: 0,
}

interface ComponentExampleTitleProps {
  description?: React.ReactNode
  title: React.ReactNode
}

export default class ComponentExampleTitle extends React.PureComponent<ComponentExampleTitleProps> {
  render() {
    const { description, title } = this.props
    return (
      <div>
        {title && (
          <Header as="h3" className="no-anchor" styles={titleStyle}>
            {title}
          </Header>
        )}
        {description && <p>{description}</p>}
      </div>
    )
  }
}
