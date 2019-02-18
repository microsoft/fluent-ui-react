import * as React from 'react'

import { neverUpdate } from 'docs/src/hoc'

// TODO: use Flex or a Table component, when it will be available
const ComponentTableHeader = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Default</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
)

export default neverUpdate(ComponentTableHeader)
