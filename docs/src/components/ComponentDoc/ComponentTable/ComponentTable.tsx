import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import ComponentTableHeader from './ComponentTableHeader'
import ComponentTableRow from './ComponentTableRow'

/**
 * Displays a table of a Component's PropTypes.
 */
const ComponentTable: any = ({ props }) => (
  <table>
    <ComponentTableHeader />
    {_.map(props, propDef => (
      <ComponentTableRow {...propDef} key={propDef.name} />
    ))}
  </table>
)

ComponentTable.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object),
}

export default ComponentTable
