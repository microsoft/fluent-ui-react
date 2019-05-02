import * as _ from 'lodash'
import * as React from 'react'

import ComponentPropsRow from './ComponentPropsRow'
import useComponentProps from 'docs/src/components/ComponentDoc/useComponentProps'

const tableStyles: React.CSSProperties = {
  textAlign: 'left',
  borderCollapse: 'collapse',
}

type ComponentPropsTable = {
  componentName: string
}

/**
 * Displays a table of a Component's PropTypes.
 * TODO: use Flex or a Table component, when it will be available
 */
const ComponentPropsTable: React.FunctionComponent<ComponentPropsTable> = props => {
  const componentProps = useComponentProps(props.componentName)

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Default</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {_.map(componentProps, propDef => (
          <ComponentPropsRow {...propDef} key={propDef.name} />
        ))}
      </tbody>
    </table>
  )
}

export default ComponentPropsTable
