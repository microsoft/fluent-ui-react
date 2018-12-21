import * as React from 'react'

import { neverUpdate } from 'docs/src/hoc'

const ComponentTableHeader = () => (
  <tr>
    <th>Name</th>
    <th>Default</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
)

export default neverUpdate(ComponentTableHeader)
