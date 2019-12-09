import * as React from 'react'
import { Embed } from '@fluentui/react'

const EmbedExampleYouTube = () => (
  <Embed
    iframe={{
      allowFullScreen: true,
      width: 560,
      height: 315,
      src: 'https://www.youtube.com/embed/D0WnZyxp_Wo?autoplay=1',
      frameBorder: 0,
      allow: ['autoplay'],
    }}
    placeholder="http://i.ytimg.com/vi/D0WnZyxp_Wo/hqdefault.jpg"
    title="Picachu YouTube video"
  />
)

export default EmbedExampleYouTube
