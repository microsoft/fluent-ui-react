import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Divider } from 'semantic-ui-react'

const descriptionStyle = {
  color: '#777',
  fontSize: '1.08em',
}

export default class ComponentPropsDescription extends React.PureComponent<any, any> {
  static propTypes = {
    description: PropTypes.string,
  }

  render() {
    const { description } = this.props

    return (
      <div style={descriptionStyle}>
        {description}
        <Divider />
      </div>
    )
  }
}
