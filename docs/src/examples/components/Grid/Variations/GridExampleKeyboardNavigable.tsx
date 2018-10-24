import React from 'react'
import { Grid, Image, Button, gridBehavior } from '@stardust-ui/react'
import _ from 'lodash'

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
    key: 'laura',
  },
  {
    key: 'matt',
  },
  {
    key: 'nan',
  },
  {
    key: 'nom',
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

const imageButtonStyles = {
  minWidth: '72px',
  maxWidth: '72px',
  height: '72px',
  padding: '0',
  margin: '0',
  background: '#fff',
}
const renderImages = () => {
  return _.map(images, image => (
    <Image
      key={image.key}
      fluid
      src={`public/images/avatar/large/${image.key}.jpg`}
      data-is-focusable="true"
    />
  ))
}

const renderImageButtons = () => {
  return _.map(images, image => (
    <Button key={image.key} styles={imageButtonStyles}>
      <Image fluid src={`public/images/avatar/large/${image.key}.jpg`} />
    </Button>
  ))
}

const gridStyles = {
  gridColumnGap: '10px',
  gridRowGap: '10px',
}

const GridExample = () => (
  <div>
    Grid with images, which are not natively focusable elements. Set 'data-is-focusable=true' to
    each item to make grid items focusable and navigable.
    <Grid accessibility={gridBehavior} styles={gridStyles} columns="7">
      {renderImages()}
    </Grid>
    <br />
    Grid with images, wrapped with button components, which are natively focusable elements. No need
    to add 'data-is-focusable'='true'
    <Grid accessibility={gridBehavior} styles={gridStyles} columns="7">
      {renderImageButtons()}
    </Grid>
  </div>
)

export default GridExample
