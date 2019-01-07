import * as PropTypes from 'prop-types'
import * as React from 'react'

import KnobsField from './KnobsField'
import KnobsLabel from './KnobsLabel'
import KnobsControl from './KnobsControl'

class KnobsBoolean extends React.Component<any, any> {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
  }

  handleChange = ({ target: { checked } }) => {
    const { name, onChange } = this.props

    onChange({ [name]: checked })
  }

  render() {
    const { name, value } = this.props
    const booleanValue = !!value

    return (
      <KnobsField>
        <KnobsControl>
          <input type="checkbox" defaultChecked={booleanValue} onChange={this.handleChange} />
        </KnobsControl>
        <KnobsLabel value={value} name={name} />
      </KnobsField>
    )
  }
}

export default KnobsBoolean
