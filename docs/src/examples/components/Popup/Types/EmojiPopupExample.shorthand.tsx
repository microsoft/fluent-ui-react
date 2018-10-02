import React from 'react'
import { Button, Popup, Grid, Image, Input } from '@stardust-ui/react'
import * as _ from 'lodash'

const imageStyle = {
  padding: '5px',
}

const images = [
  {
    key: 'ade',
  },
  {
    key: 'chris',
  },
  {
    key: 'christian',
  },
  {
    key: 'daniel',
  },
  {
    key: 'elliot',
  },
  {
    key: 'elyse',
    src: 'public/images/avatar/large/elyse.png',
  },
  {
    key: 'helen',
  },
  {
    key: 'jenny',
  },
  {
    key: 'joe',
  },
  {
    key: 'justen',
  },
  {
    key: 'kristy',
    src: 'public/images/avatar/large/kristy.png',
  },
  {
    key: 'laura',
  },
  {
    key: 'matt',
  },
  {
    key: 'molly',
    src: 'public/images/avatar/large/molly.png',
  },
  {
    key: 'matthew',
    src: 'public/images/avatar/large/matthew.png',
  },
  {
    key: 'nan',
  },
  {
    key: 'patrick',
    src: 'public/images/avatar/large/patrick.png',
  },
  {
    key: 'nom',
  },
  {
    key: 'rachel',
    src: 'public/images/avatar/large/rachel.png',
  },
  {
    key: 'stevie',
  },
  {
    key: 'steve',
  },
  {
    key: 'tom',
  },
  {
    key: 'veronika',
  },
]

const renderImages = () => {
  return _.map(images, (image, index) => (
    <Image
      data-is-focusable="true"
      styles={imageStyle}
      key={image.key}
      aria-label={`image of ${image.key}`}
      alt={`image of ${image.key}`}
      fluid
      src={image.src ? image.src : `public/images/avatar/large/${image.key}.jpg`}
    />
  ))
}

const handleKeyDown = (e: Event) => {
  console.log(e)
  console.log(document.activeElement)
}

const EmojiPopup = () => (
  <Popup
    position="below"
    trigger={<Button icon="smile" />}
    content={
      <div>
        {<Input styles={{ marginBottom: '5px' }} fluid icon="search" placeholder="Search..." />}
        {<br />}
        {
          <Grid
            onKeyDown={handleKeyDown}
            styles={{ width: '300px' }}
            columns="5"
            content={renderImages()}
          />
        }
      </div>
    }
  />
)

export default EmojiPopup
