import * as React from 'react'
import { Header } from 'semantic-ui-react'

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
          <Header as="h3" className="no-anchor" style={titleStyle}>
            {title}
          </Header>
        )}
        {description && <p>{description}</p>}
      </div>
    )
  }
}
