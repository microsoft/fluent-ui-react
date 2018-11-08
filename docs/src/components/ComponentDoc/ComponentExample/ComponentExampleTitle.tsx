import PropTypes from 'prop-types'
import * as React from 'react'
import { Header } from 'semantic-ui-react'

const titleStyle = {
  margin: 0,
}

export default class ComponentExampleTitle extends React.PureComponent<any, any> {
  static propTypes = {
    description: PropTypes.node,
    title: PropTypes.node,
  }

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
