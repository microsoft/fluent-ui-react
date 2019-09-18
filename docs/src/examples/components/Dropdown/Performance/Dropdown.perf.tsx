import { Dropdown } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

const inputItems = _.times(300, (i: number) => ({
  content: `content: ${i}`,
  key: i,
  header: `header: ${i}`,
}))

const DropdownPerf = () => (
  <Dropdown defaultOpen items={inputItems} placeholder="Select your hero" />
)

export default DropdownPerf
