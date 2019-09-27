import * as React from 'react'
import { Carousel, Image } from '@stardust-ui/react'

const carouselItems = [
  { as: Image, src: 'public/images/avatar/large/ade.jpg' },
  { as: Image, src: 'public/images/avatar/large/elliot.jpg' },
  { as: Image, src: 'public/images/avatar/large/kristy.png' },
  { as: Image, src: 'public/images/avatar/large/nan.jpg' },
]

const CarouselExample = () => <Carousel items={carouselItems} />

export default CarouselExample
