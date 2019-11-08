import * as React from 'react'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProviderAndGetComponent } from 'test/utils'
import TableCell from 'src/components/Table/TableCell'

import TableRow from 'src/components/Table/TableRow'

describe('TableRow', () => {
  isConformant(TableRow)

  describe('accessiblity', () => {
    handlesAccessibility(TableRow)
  })

  const items = [
    { content: '1', key: '1-1' },
    {
      content: 'Roman van von der Longername',

      key: '1-2',
    },
    { content: 'None', key: '1-3' },
    { content: '30 years', key: '1-4' },
  ]

  it('renders as `div`', () => {
    const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} />)
      .find('.ui-table__row')
      .hostNodes()

    expect(tableRow.is('div')).toBe(true)
  })

  describe('items', () => {
    describe('render children', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={items} />)
        .find('.ui-table__row')
        .hostNodes()

      const tableCells = tableRow.find(TableCell)
      expect(tableCells.length).toBe(4)
      expect(tableCells.first().props().content).toBe('1')
      expect(tableCells.last().props().content).toBe('30 years')
    })

    describe('does not render empty children', () => {
      const tableRow = mountWithProviderAndGetComponent(TableRow, <TableRow items={[]} />)
        .find('.ui-table__row')
        .hostNodes()

      const tableCells = tableRow.find(TableCell)
      expect(tableCells.length).toBe(0)
    })
  })

  describe('isHeader', () => {
    describe('render columnheader role when is true', () => {
      const tableRow = mountWithProviderAndGetComponent(
        TableRow,
        <TableRow items={items} isHeader={true} />,
      )
        .find('.ui-table__row')
        .hostNodes()

      const tableCells = tableRow.find(TableCell)
      expect(tableCells.length).toBe(4)
      expect(tableCells.first().props().role).toBe('columnheader')
      expect(tableCells.last().props().role).toBe('columnheader')
    })

    describe('not render columnheader cells when is false', () => {
      const tableRow = mountWithProviderAndGetComponent(
        TableRow,
        <TableRow items={items} isHeader={false} />,
      )
        .find('.ui-table__row')
        .hostNodes()

      const tableCells = tableRow.find(TableCell)
      expect(tableCells.length).toBe(4)
      expect(tableCells.first().props().role).not.toBe('columnheader')
      expect(tableCells.last().props().role).not.toBe('columnheader')
    })
  })
})
