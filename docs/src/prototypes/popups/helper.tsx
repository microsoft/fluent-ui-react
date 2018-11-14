import * as _ from 'lodash'
import React from 'react'
import { Button, Image } from '@stardust-ui/react'

export const emojiImages = [
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

export const arrayOfStickerImages = [
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
]

const imageStyle = {
  width: '100%',
}

const imageButtonStyles = {
  minWidth: '56px',
  height: '56px',
  padding: '0',
  background: '#fff',
}

const handleSelection = e => {
  if (!e.target) return
  const img = e.target.nodeName !== 'IMG' ? e.target.querySelector('img') : e.target
  const selectedItem = img && img.getAttribute('aria-label')
  if (!selectedItem) return
  alert(`The image was selected "${selectedItem}"`)
}

export const renderImages = (images, ariaLabelPart) => {
  return _.map(images, (image, index) => (
    <li key={image.key}>
      <Button
        styles={imageButtonStyles}
        onClick={handleSelection}
        title={`${ariaLabelPart} ${image.key}`}
        role="listitem"
        aria-setsize={images.length}
        aria-posinset={index + 1}
      >
        <Image
          styles={imageStyle}
          fluid
          src={image.src ? image.src : `public/images/avatar/large/${image.key}.jpg`}
        />
      </Button>
    </li>
  ))
}
