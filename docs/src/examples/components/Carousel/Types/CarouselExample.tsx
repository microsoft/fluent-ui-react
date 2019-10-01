import * as React from 'react'
import { Carousel, Image } from '@stardust-ui/react'

const carouselItems = [
  { content: { as: Image, src: 'public/images/avatar/large/ade.jpg' } },
  { content: { as: Image, src: 'public/images/avatar/large/elliot.jpg' } },
  { content: { as: Image, src: 'public/images/avatar/large/kristy.png' } },
  { content: { as: Image, src: 'public/images/avatar/large/nan.jpg' } },
]

const CarouselExample = () => <Carousel items={carouselItems} />

export default CarouselExample
