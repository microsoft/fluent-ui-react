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
]

const images = imageNames.map((name, index) => (
  <Image key={`${name}-${index}`} fluid src={`public/images/avatar/large/${name}`} />
))

const GridExample = () => (
  <div>
    <Grid content={images} />
  </div>
)

export default GridExample
