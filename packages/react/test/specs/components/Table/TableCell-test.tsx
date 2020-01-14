import * as React from 'react'
import { isConformant, handlesAccessibility } from '../../commonTests'
import { mountWithProviderAndGetComponent } from '../../../utils'
import { TableCell } from '@fluentui/react'

describe('TableCell', () => {
  isConformant(TableCell)

  describe('accessiblity', () => {
    handlesAccessibility(TableCell, { defaultRootRole: 'cell' })
  })

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
