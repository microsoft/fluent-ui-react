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
  'stevie.jpg',
  'tom.jpg',
  'veronika.jpg',
]

const images = imageNames.map((name, index) => (
  <Image key={`${name}-${index}`} fluid src={`public/images/avatar/large/${name}`} />
))

const GridExample = () => (
  <div>
    Grid with specified number or columns:
    <Grid columns="7" content={images} />
    <br />
    Grid with explicitly specified columns:
    <Grid columns="repeat(3, 1fr) 2fr 2fr 110px 14rem 50px 20%" content={images} />
  </div>
)

export default GridExample
