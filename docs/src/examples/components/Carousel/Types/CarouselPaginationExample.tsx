import * as React from 'react'
import { Carousel, Image } from '@stardust-ui/react'

const imageAltTags = {
  ade: 'Portrait of Ade',
  elliot: 'Portrait of Elliot',
  kristy: 'Portrait of Kristy',
  nan: 'Portrait of Nan',
}
const carouselItems = [
  {
    key: 'ade',
    content: <Image src="public/images/avatar/large/ade.jpg" fluid alt={imageAltTags.ade} />,
  },
  {
    key: 'elliot',
    content: <Image src="public/images/avatar/large/elliot.jpg" fluid alt={imageAltTags.elliot} />,
  },
  {
    key: 'kristy',
    content: <Image src="public/images/avatar/large/kristy.png" fluid alt={imageAltTags.kristy} />,
  },
  {
    key: 'nan',
    content: <Image src="public/images/avatar/large/nan.jpg" fluid alt={imageAltTags.nan} />,
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
