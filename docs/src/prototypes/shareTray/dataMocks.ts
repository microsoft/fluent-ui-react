import { GridPickerItemProps } from './GridFilePicker/GridFilePickerItem'
import * as _ from 'lodash'

export const shareScreenText = 'Share screen '

export const screenshare = ['Desktop/Windows']

export const shareFileText = 'Share a file '
export const powerPoint = [
  'Instant Meetings.pptx',
  'Meeting Code.pptx',
  'Multi-window model meetings-calls.pptx',
  'Raise Hand - Meetings.pptx',
  'Raise Hand.pptx',
  'CSUN 2019 - recap.pptx',
  'Meetings LT review 5-2-2019.pptx',
  'Microsoft Teams CSUN 2019.pptx',
  'Storytelling Womens Day.pptx',
  'People LT Review Feb 2019.pptx',
  'Data and Analytics Team LT Review (March 2019).pptx',
  'Customer Review Feb 2019.pptx',
]

export const shareText = 'Share '
export const whiteBoard = ['Microsoft Whiteboard', 'Invision Whiteboard']

export const getItemsData = (
  fileNames: string[],
  ariaLabelPart: string,
  icon: string,
  role?: string,
) => {
  return _.map(fileNames, fileName => {
    const props = {
      title: `${ariaLabelPart}${fileName}`,
      onClick: e => {
        console.log(`Selected item is ...`)
      },
      fileName,
      icon,
      backgroundColor: icon === 'star' ? '#f36' : undefined,
      role,
    } as GridPickerItemProps

    return props
  })
}
