import * as PropTypes from 'prop-types'
import * as React from 'react'

import KnobsField from './KnobsField'
import KnobsLabel from './KnobsLabel'
import KnobsControl from './KnobsControl'

class KnobsScalar extends React.Component<any, any> {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  defaultValue: any
  defaultUnit: any
  parseValue: any
  makeUnitValue: any

  componentWillMount() {
    const { value } = this.props
    const hasDecimal = /\.\d/.test(value)
    this.parseValue = val => (hasDecimal ? parseFloat(val) : parseInt(val, 10))

    this.defaultValue = this.parseValue(value)
    this.defaultUnit = `${value}`.replace(this.defaultValue, '')

    this.makeUnitValue = val => `${val}${this.defaultUnit}`
  }

  handleChange = ({ target: { value } }) => {
    const { name, onChange } = this.props

    onChange({ [name]: this.makeUnitValue(value) })
  }

  render() {
    const { name, value } = this.props

    return (
      <KnobsField>
        <KnobsControl>
          <input
            type="range"
            min="0"
            max={this.defaultValue * 3}
            step="1"
            value={this.parseValue(value)}
            onChange={this.handleChange}
            style={{ width: '100%' }}
          />
        </KnobsControl>
        <KnobsLabel name={name} value={value} />
      </KnobsField>
    )
  }
}

export default KnobsScalar
