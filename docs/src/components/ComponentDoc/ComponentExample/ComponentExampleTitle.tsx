import PropTypes from 'prop-types'
import * as React from 'react'
import { Header, Label } from '@stardust-ui/react'

const titleStyle = {
  margin: 0,
}

export default class ComponentExampleTitle extends React.PureComponent<any, any> {
  static propTypes = {
    description: PropTypes.node,
    title: PropTypes.node,
    suiVersion: PropTypes.string,
  }

  render() {
    const { description, title, suiVersion } = this.props
    return (
      <div>
        {title && (
          <Header as="h3" className="no-anchor" style={titleStyle}>
            {title}
            {suiVersion && (
              <Label
                as="a"
                content={suiVersion}
                styles={{ root: { color: 'teal', fontSize: 'x-small' } }}
                children={`Available from Semantic UI ${suiVersion}`}
              />
            )}
          </Header>
        )}
        {description && <p>{description}</p>}
      </div>
    )
  }
}
