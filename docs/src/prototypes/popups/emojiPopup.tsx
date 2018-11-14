import React from 'react'
import {
  Button,
  Popup,
  Grid,
  Input,
  popupFocusTrapBehavior,
  gridBehavior,
} from '@stardust-ui/react'
import { emojiImages, renderImages } from './helper'
import * as _ from 'lodash'

const EmojiPopup = () => (
  <Popup
    accessibility={popupFocusTrapBehavior}
    position="below"
    trigger={<Button icon="smile" aria-label="Choose an emoji." />}
    content={{
      content: (
        <div
          aria-label="Choose an emoji. Press Enter key to insert emoji."
          role="dialog"
          aria-modal="true"
        >
          {<Input styles={{ marginBottom: '5px' }} fluid icon="search" placeholder="Search..." />}
          {<br />}
          {
            <Grid
              as="ul"
              accessibility={gridBehavior}
              styles={{
                width: '320px',
                listStyle: 'none',
                padding: '0',
                margin: '0',
                gridRowGap: '10px',
              }}
              columns="5"
              content={renderImages(emojiImages, 'emojii of')}
            />
          }
        </div>
      ),
    }}
  />
)

export default EmojiPopup
