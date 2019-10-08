import * as React from 'react'
import { Carousel, Image } from '@stardust-ui/react'

const carouselItems = [
  {
    key: 'ade',
    slide: { as: Image, src: 'public/images/avatar/large/ade.jpg', alt: 'Portrait of Ade' },
  },
  {
    key: 'elliot',
    slide: { as: Image, src: 'public/images/avatar/large/elliot.jpg', alt: 'Portrait of Elliot' },
  },
  {
    key: 'kristy',
    slide: { as: Image, src: 'public/images/avatar/large/kristy.png', alt: 'Portrait of Kristy' },
  },
  {
    key: 'nan',
    slide: { as: Image, src: 'public/images/avatar/large/nan.jpg', alt: 'Portrait of Nan' },
  },
]

const CarouselExample = () => (
  <Carousel
    cyclical
    tabList={{ 'aria-label': 'choose slide to display' }}
    items={carouselItems}
    buttonNext={{ 'aria-label': 'go to next slide' }}
    buttonPrevious={{ 'aria-label': 'go to previous slide' }}
  />
)

export default CarouselExample
