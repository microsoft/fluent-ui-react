import * as React from 'react'
import { ItemLayout } from '@stardust-ui/react'

const ItemLayoutExample = () => (
  <ItemLayout
    media={<div>Media</div>}
    content={<div>Content</div>}
    contentMedia={<div>Content Media</div>}
    endMedia={<div>End Media</div>}
    header={<div>Header</div>}
    headerMedia={<div>HeaderMedia</div>}
  />
)

export default ItemLayoutExample
