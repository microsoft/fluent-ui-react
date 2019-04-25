import * as React from 'react'

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

const arePropsEqual = () => true

export default React.memo(ComponentTableHeader, arePropsEqual)
