import PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import { Table } from 'semantic-ui-react'

import ComponentPropDefaultValue from '../ComponentProp/ComponentPropDefaultValue'
import ComponentPropDescription from '../ComponentProp/ComponentPropDescription'
import ComponentPropEnum from '../ComponentProp/ComponentPropEnum'
import ComponentPropFunctionSignature from '../ComponentProp/ComponentPropFunctionSignature'
import ComponentPropName from '../ComponentProp/ComponentPropName'

export default class ComponentTableRow extends React.Component<any, any> {
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
    const { defaultValue, description, name, required, tags, type, value } = this.props
    const { showEnums } = this.state
    const hideRow = this.docSiteHidden(tags)

    return (
      <Table.Row key={name} className={hideRow ? 'hidden' : ''}>
        <Table.Cell collapsing>
          <ComponentPropName name={name} required={required} />
        </Table.Cell>
        <Table.Cell collapsing>
          <ComponentPropDefaultValue value={defaultValue} />
        </Table.Cell>
        <Table.Cell collapsing>{`{${type}}`}</Table.Cell>
        <Table.Cell>
          <ComponentPropDescription description={description} />
          <ComponentPropFunctionSignature name={name} tags={tags} />
          <ComponentPropEnum
            showAll={showEnums}
            toggle={this.toggleEnums}
            type={type}
            values={value}
          />
        </Table.Cell>
      </Table.Row>
    )
  }

  docSiteHidden(tags) {
    const hide = _.filter(tags, { title: 'docSiteIgnore' })
    return !!hide.length
  }
}

export const hidden = `
    display: none
`
