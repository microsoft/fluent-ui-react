import * as React from 'react'
import { Flex } from '@stardust-ui/react'

import * as data from './dataMocks'

import GridFilePicker from './GridFilePicker/GridFilePicker'

export const screenShareGrid = (
  <GridFilePicker
    gridColumns={1}
    items={data.getItemsData(data.screenshare, data.shareScreenText, 'home')}
    title="Screenshare"
    asMenu={true}
  />
)
export const powerPointGrid = (
  <GridFilePicker
    items={data.getItemsData(data.powerPoint, data.shareFileText, 'powerpoint-color')}
    title="PowerPoint"
    asMenu={true}
  />
)

export const whiteBoardGrid = (
  <GridFilePicker
    items={data.getItemsData(data.whiteBoard, data.shareText, 'star')}
    title="Whiteboard"
    asMenu={true}
  />
)

const ShareTrayMenu = () => (
  <Flex>
    {screenShareGrid}
    {powerPointGrid}
    {whiteBoardGrid}
  </Flex>
)

export default ShareTrayMenu
