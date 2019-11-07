import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'
import TableCell from 'src/components/Table/TableCell'

describe('TableCell', () => {
  isConformant(TableCell)

  it('renders as `div`', () => {
    const tableCell = mountWithProviderAndGetComponent(
      TableCell,
      <TableCell content="CellContent" />,
    )
      .find('.ui-table__cell')
      .hostNodes()

    expect(tableCell.is('div')).toBe(true)
    expect(tableCell.text()).toBe('CellContent')
  })
})
