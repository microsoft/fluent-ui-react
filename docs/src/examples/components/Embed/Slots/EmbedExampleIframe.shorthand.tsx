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
  />
)

export default EmbedExampleIframe
