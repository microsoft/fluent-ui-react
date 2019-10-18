import * as React from 'react'
import { Carousel, Image, SizeValue } from '@stardust-ui/react'

const carouselItems = [
  {
    key: 'ade',
    id: 'ade',
    slide: { as: Image, src: 'public/images/avatar/large/ade.jpg', alt: 'Portrait of Ade' },
  },
  {
    key: 'elliot',
    id: 'elliot',
    slide: { as: Image, src: 'public/images/avatar/large/elliot.jpg', alt: 'Portrait of Elliot' },
  },
  {
    key: 'kristy',
    id: 'kristy',
    slide: { as: Image, src: 'public/images/avatar/large/kristy.png', alt: 'Portrait of Kristy' },
  },
  {
    key: 'nan',
    id: 'nan',
    slide: { as: Image, src: 'public/images/avatar/large/nan.jpg', alt: 'Portrait of Nan' },
  },
]

const CarouselExample = () => (
  <Carousel
    cyclical
    ariaRoleDescription="carousel"
    tabList={{
      'aria-label': 'people portraits',
      items: carouselItems.map((item, index) => ({
        key: index,
        'aria-controls': item.id,
        'aria-label': item.slide.alt,
        icon: { name: 'stardust-circle', size: 'smallest' as SizeValue },
      })),
    }}
    items={carouselItems}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
)

export default CarouselExample
