import * as React from 'react'
import StaticTable from './StaticTable'
import TableWithFocusableElements from './TableWithFocusableElements'
import TableNestedNavigation from './TableNestedNavigation'
import GridTable from './GridTable'

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '350px' }}>
    <h3>Static table:</h3>
    <p>No focusable elements, navigation only with screen reader</p>
    <StaticTable />
    <br />
    <h3>Table with focusable elements:</h3>
    <p>Table has some focusable elements. TAB through focusable elements or use screen reader.</p>
    <TableWithFocusableElements />
    <br />
    <h3>Table with nested rows navigation:</h3>
    <p> Use up/down arrow keys to navigate between rows.</p>
    <p>
      Press right arrow to go inside arrow. Then use left/right arrow keys to navigate between
      cells.
    </p>
    <TableNestedNavigation />
    <br />
    <h3>Grid table:</h3>
    <p>Use left/right/up/down arrow keys to navigate between cells.</p>
    <GridTable />
  </div>
)
