import React from 'react'
import { Grid, Image } from '@stardust-ui/react'

const imageNames = [
  'ade.jpg',
  'chris.jpg',
  'christian.jpg',
  'daniel.jpg',
  'elliot.jpg',
  'elyse.png',
  'helen.jpg',
  'jenny.jpg',
  'joe.jpg',
  'justen.jpg',
  'kristy.png',
  'laura.jpg',
  'matt.jpg',
  'matthew.png',
  'molly.png',
  'nan.jpg',
  'nom.jpg',
  'patrick.png',
  'rachel.png',
  'steve.jpg',
  'steve.jpg',
  'stevie.jpg',
  'tom.jpg',
  'veronika.jpg',
]

const images = imageNames.map((name, index) => (
  <Image key={`${name}-${index}`} src={`public/images/avatar/large/${name}`} />
))

const GridExample = () => (
  <div>
    Grid1:
    <Grid itemSize="80px" content={images}>
      {images}
    </Grid>
    Grid2:
    <Grid itemSize="80px" flow="column" content={images}>
      {images}
    </Grid>
    Grid3:
    <Grid columns="3" content={images}>
      {images}
    </Grid>
    Grid4:
    <Grid rows="3" content={images}>
      {images}
    </Grid>
    Grid5:
    <Grid rows="3" columns="4" content={images}>
      {images}
    </Grid>
    Grid6:
    <Grid rows="3" columns="4" content={images}>
      {images}
    </Grid>
  </div>
)

export default GridExample
