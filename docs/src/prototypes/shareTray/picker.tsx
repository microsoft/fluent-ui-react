import * as React from 'react'

import * as data from './dataMocks'

import GridFilePicker from './GridFilePicker/GridFilePicker'
import { Flex } from '@stardust-ui/react/src'

export const PickerGrid = ({
  containerRole,
  itemRole,
  containerRoleDescription,
  itemRoleDescription,
  horizontal,
}) => (
  <Flex style={{ maxWidth: '400px', backgroundColor: 'silver' }}>
    <GridFilePicker
      items={data.getItemsData(data.picker, '', 'star', itemRole, itemRoleDescription)}
      title="Picker"
      role={containerRole}
      roleDescription={containerRoleDescription}
      orientation={horizontal ? 'horizontal' : undefined}
      image={true}
    />
  </Flex>
)
