import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Popup } from '@stardust-ui/react'

export default class ComponentPropName extends React.PureComponent<any, any> {
  static propTypes = {
    name: PropTypes.string,
    required: PropTypes.bool,
    slot: PropTypes.bool,
  }

  render() {
    const { name, required, slot } = this.props
    const slotStyle: React.CSSProperties = {
      color: 'blue',
      fontWeight: 'bold',
    }

    return (
      <div>
        <code>{name}</code>
        {required && (
          <Popup
            content="Required"
            align="center"
            styles={{ fontSize: 'x-small' }}
            trigger={<Icon styles={{ color: 'red' }} name="redbang" size="small" />}
          />
        )}
        {slot && (
          <Popup
            content="Slot - see Shorthand Props page for details."
            align="center"
            styles={{ fontSize: 'x-small' }}
            trigger={<span style={slotStyle}>&nbsp;S&nbsp;</span>}
          />
        )}
      </div>
    )
  }
}
