import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Table } from 'semantic-ui-react'

import ComponentTableHeader from './ComponentTableHeader'
import ComponentTableRow from './ComponentTableRow'

/**
 * Displays a table of a Component's PropTypes.
 */
const ComponentTable: any = ({ props }) => (
  <Table compact="very" basic="very">
    <ComponentTableHeader />
    <Table.Body>
      {_.map(props, propDef => (
        <ComponentTableRow {...propDef} key={propDef.name} />
      ))}
    </Table.Body>
  </Table>
)

ComponentTable.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object),
}

export default ComponentTable
