import * as React from 'react'

import { neverUpdate } from 'docs/src/hoc'

// TODO: Use Flex or some Table component
const ComponentPropHeader = () => (
  <th>
    <tr>
      <td>Name</td>
      <td>Default</td>
      <td>Type</td>
      <td>Description</td>
    </tr>
  </th>
)

export default neverUpdate(ComponentPropHeader)
