import * as React from 'react'
import { Image, Layout } from '@stardust-ui/react'

const ImageExampleFluent = () => (
  <div>
    <Layout
      style={{ maxWidth: '70px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
    <Layout
      style={{ maxWidth: '100px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
    <Layout
      style={{ maxWidth: '150px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
  </div>
)

export default ImageExampleFluent
