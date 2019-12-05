import * as React from 'react'

import { Text } from '@fluentui/react'
import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link } from '../../../../utils/helpers'

const doList = [
  <Text>
    Choose desired accessibility behavior for grid cell depending on the use case.(Check the{' '}
    {link('Behaviors', '/components/table/accessibility')} section).
  </Text>,
  'Provide label to the Table component using `aria-label` or `aria-labelledby` prop.',
  'Provide label to the Row component using `aria-label` or `aria-labelledby` prop. If not, then each cell of the row is narrated by screen reader.',
  'Provide label to the table header column, if cell has no content.',
  'Stop event propagation, when you will add actionable element into the grid cell.',
]

const dontList = [
  "Don't set onClick action on row, which will be not available in the cell of grid, as well. With screen reader navigation user can navigate only cell by cell.",
]

const TableBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default TableBestPractices
