import * as React from 'react'
import { Carousel, Image, SizeValue } from '@stardust-ui/react'

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
    aria-roledescription="carousel"
    tabList={{
      'aria-label': 'people portraits',
      items: carouselItems.map((item, index) => ({
        key: index,
        'aria-label': item.slide.alt,
        icon: { name: 'stardust-circle', size: 'smallest' as SizeValue },
      })),
    }}
    items={carouselItems}
    buttonNext={{ 'aria-label': 'go to next slide' }}
    buttonPrevious={{ 'aria-label': 'go to previous slide' }}
  />
)

export default CarouselExample
