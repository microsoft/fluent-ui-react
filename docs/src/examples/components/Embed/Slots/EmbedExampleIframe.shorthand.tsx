import * as React from 'react'
import { Embed } from '@stardust-ui/react'

const EmbedExampleIframe = () => (
  <Embed
    iframe={{
      allowFullScreen: true,
      frameBorder: 0,
      src: 'https://yandex.ru/map-widget/v1/-/CCCFjOzg',
      height: 450,
      width: 600,
    }}
    control="search"
    placeholder="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=14.4560,50.0478&z=13&l=map&size=600,450"
    title="Map of Prague"
  />
)

export default EmbedExampleIframe
