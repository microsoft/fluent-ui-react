import * as React from 'react'
import GridImagePicker from './GridImagePicker/GridImagePicker'
import { imageNames, getItemsData } from './dataMocks'
import { Button, Popup, dialogBehavior } from '@stardust-ui/react'

const EmojiPicker = () => (
  <Popup
    accessibility={dialogBehavior}
    position="below"
    trigger={<Button icon="smile" aria-label="Choose an emoji." />}
    content={{
      content: <GridImagePicker items={getItemsData(imageNames, 'emoji of')} />,
      'aria-label': 'Choose an emoji. Press Enter key to insert emoji.',
    }}
  />
)

export default EmojiPicker
