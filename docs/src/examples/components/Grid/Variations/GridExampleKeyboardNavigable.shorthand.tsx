import * as React from 'react'
import { Grid, Image, Button, gridBehavior } from '@stardust-ui/react'
import * as _ from 'lodash'

const imageNames = [
  'ade',
  'chris',
  'christian',
  'daniel',
  'elliot',
  'helen',
  'jenny',
  'joe',
  'justen',
  'laura',
  'matt',
  'nan',
  'nom',
  'stevie',
  'steve',
  'tom',
  'veronika',
]

const imageButtonStyles = {
  minWidth: '72px',
  maxWidth: '72px',
  height: '72px',
  padding: '0',
  margin: '0',
}

const renderImages = () => {
  return _.map(imageNames, imageName => (
    <Image
      key={imageName}
      fluid
      src={`public/images/avatar/large/${imageName}.jpg`}
      data-is-focusable="true"
    />
  ))
}

const renderImageButtons = () => {
  return _.map(imageNames, imageName => (
    <Button key={imageName} styles={imageButtonStyles}>
      <Image fluid src={`public/images/avatar/large/${imageName}.jpg`} />
    </Button>
  ))
}

const GridExample = () => (
  <div>
    Grid with images, which are not natively focusable elements. Set 'data-is-focusable=true' to
    each item to make grid items focusable and navigable.
    <Grid accessibility={gridBehavior} columns="7" content={renderImages()} />
    <br />
    Grid with images, wrapped with buttons, which are natively focusable elements. No need to add
    'data-is-focusable'='true'.
    <Grid accessibility={gridBehavior} columns="7" content={renderImageButtons()} />
  </div>
)

export default GridExample
