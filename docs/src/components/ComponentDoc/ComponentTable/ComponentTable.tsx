import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import ComponentTableHeader from './ComponentTableHeader'
import ComponentTableRow from './ComponentTableRow'

const tableStyles: React.CSSProperties = {
  textAlign: 'left',
  borderCollapse: 'collapse',
}
/**
 * Displays a table of a Component's PropTypes.
 * TODO: use Flex or a Table component, when it will be available
 */
const ComponentTable: any = ({ props }) => (
  <table style={tableStyles}>
    <ComponentTableHeader />
    <tbody>
      {_.map(props, propDef => (
        <ComponentTableRow {...propDef} key={propDef.name} />
      ))}
    </tbody>
  </table>
)

ComponentTable.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object),
}

export default ComponentTable
