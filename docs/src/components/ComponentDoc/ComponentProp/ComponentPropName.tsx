import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Popup } from '@stardust-ui/react'

export default class ComponentPropName extends React.PureComponent<any, any> {
  static propTypes = {
    name: PropTypes.string,
    required: PropTypes.bool,
  }

  render() {
    const { name, required } = this.props

    return (
      <div>
        <code>{name}</code>
        {required && (
          <Popup
            content="Required"
            align="center"
            styles={{ fontSize: 'x-small' }}
            trigger={<Icon styles={{ color: 'red' }} name="asterisk" size="small" />}
          />
        )}
      </div>
    )
  }
}
