import * as React from 'react'
import { Embed } from '@stardust-ui/react'

const EmbedExampleYouTube = () => (
  <Embed
    iframe={{
      allowFullScreen: true,
      width: 560,
      height: 315,
      src: 'https://www.youtube.com/embed/D0WnZyxp_Wo',
      frameBorder: 0,
    }}
    placeholder="http://i.ytimg.com/vi/D0WnZyxp_Wo/hqdefault.jpg"
  />
)

export default EmbedExampleYouTube
