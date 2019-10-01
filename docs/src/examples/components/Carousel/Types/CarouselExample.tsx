import * as React from 'react'
import { Carousel, Image } from '@stardust-ui/react'

const carouselItems = [
  { slide: { as: Image, src: 'public/images/avatar/large/ade.jpg' } },
  { slide: { as: Image, src: 'public/images/avatar/large/elliot.jpg' } },
  { slide: { as: Image, src: 'public/images/avatar/large/kristy.png' } },
  { slide: { as: Image, src: 'public/images/avatar/large/nan.jpg' } },
]

const CarouselExample = () => (
  <Carousel
    items={carouselItems}
    buttonNext={{ 'aria-label': 'go to next slide' }}
    buttonPrevious={{ 'aria-label': 'go to previous slide' }}
  />
)

export default CarouselExample
