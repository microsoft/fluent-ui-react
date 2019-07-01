import * as React from 'react'
import { Flex } from '@stardust-ui/react'

import * as data from './dataMocks'

import GridFilePicker from './GridFilePicker/GridFilePicker'

export const ScreenShareGrid = ({
  containerRole,
  itemRole,
  containerRoleDescription,
  itemRoleDescription,
  horizontal,
  wrapperRole,
  positions,
}) => (
  <GridFilePicker
    gridColumns={1}
    items={data.getItemsData(
      data.screenshare,
      data.shareScreenText,
      'home',
      itemRole,
      itemRoleDescription,
      wrapperRole,
      positions,
    )}
    title="Screenshare"
    role={containerRole}
    roleDescription={containerRoleDescription}
    orientation={horizontal ? 'horizontal' : undefined}
  />
)
export const PowerPointGrid = ({
  containerRole,
  itemRole,
  containerRoleDescription,
  itemRoleDescription,
  horizontal,
  wrapperRole,
  positions,
}) => (
  <GridFilePicker
    gridColumns={3}
    items={data.getItemsData(
      data.powerPoint,
      data.shareFileText,
      'powerpoint-color',
      itemRole,
      itemRoleDescription,
      wrapperRole,
      positions,
    )}
    title="PowerPoint"
    role={containerRole}
    roleDescription={containerRoleDescription}
    orientation={horizontal ? 'horizontal' : undefined}
  />
)

export const WhiteBoardGrid = ({
  containerRole,
  itemRole,
  containerRoleDescription,
  itemRoleDescription,
  horizontal,
  wrapperRole,
  positions,
}) => (
  <GridFilePicker
    items={data.getItemsData(
      data.whiteBoard,
      data.shareText,
      'star',
      itemRole,
      itemRoleDescription,
      wrapperRole,
      positions,
    )}
    title="Whiteboard"
    role={containerRole}
    roleDescription={containerRoleDescription}
    orientation={horizontal ? 'horizontal' : undefined}
  />
)

const ShareTray = props => (
  <Flex>
    <ScreenShareGrid {...props} />
    <PowerPointGrid {...props} />
    <WhiteBoardGrid {...props} />
  </Flex>
)

export default ShareTray
