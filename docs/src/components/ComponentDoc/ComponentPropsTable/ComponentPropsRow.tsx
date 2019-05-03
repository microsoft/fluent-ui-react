import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import ComponentPropDefaultValue from '../ComponentProp/ComponentPropDefaultValue'
import ComponentPropDescription from '../ComponentProp/ComponentPropDescription'
import ComponentPropName from '../ComponentProp/ComponentPropName'

export default class ComponentPropsRow extends React.Component<any, any> {
  static propTypes = {
    defaultValue: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    required: PropTypes.bool,
    tags: PropTypes.array,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }

  state: any = {}

  toggleEnums = () => this.setState({ showEnums: !this.state.showEnums })

  render() {
    const { defaultValue, description, name, required, tags, type } = this.props
    const hideRow = this.docSiteHidden(tags)
    const rowStyle: React.CSSProperties = {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'grey',
    }

    // TODO: use Flex or a Table component, when it will be available
    return (
      <tr className={hideRow ? 'hidden' : ''} style={rowStyle}>
        <td>
          <ComponentPropName name={name} required={required} />
        </td>
        <td>
          <ComponentPropDefaultValue value={defaultValue} />
        </td>
        <td>{`{${type}}`}</td>
        <td>
          <ComponentPropDescription description={description} />
          {/* TODO change these according to the react-docgen-typescript generated json */}
          {/* <ComponentPropFunctionSignature name={name} tags={tags} /> */}
          {/* <ComponentPropEnum */}
          {/* showAll={showEnums} */}
          {/* toggle={this.toggleEnums} */}
          {/* type={type} */}
          {/* values={value} */}
          {/* /> */}
        </td>
      </tr>
    )
  }

  docSiteHidden(tags) {
    return _.some(tags, ['title', 'docSiteIgnore'])
  }
}
