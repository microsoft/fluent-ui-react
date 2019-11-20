import * as React from 'react'
import { Carousel, Image } from '@fluentui/react'

const carouselItems = [
  {
    key: 'ade',
    content: <Image src="public/images/avatar/large/ade.jpg" fluid alt={'Portrait of Ade'} />,
  },
  {
    key: 'elliot',
    content: <Image src="public/images/avatar/large/elliot.jpg" fluid alt={'Portrait of Elliot'} />,
  },
  {
    key: 'kristy',
    content: <Image src="public/images/avatar/large/kristy.png" fluid alt={'Portrait of Kristy'} />,
  },
  {
    key: 'nan',
    content: <Image src="public/images/avatar/large/nan.jpg" fluid alt={'Portrait of Nan'} />,
  },
]

const CarouselExample = () => (
  <Carousel
    ariaRoleDescription="carousel"
    items={carouselItems}
    paddleNext={{ 'aria-label': 'go to next slide' }}
    paddlePrevious={{ 'aria-label': 'go to previous slide' }}
    getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
  />
)

export default CarouselExample
