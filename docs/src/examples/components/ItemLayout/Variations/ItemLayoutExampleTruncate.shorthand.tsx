import * as React from 'react'
import { ItemLayout, Image } from '@stardust-ui/react'

const ellipsis = <span>&hellip;</span>

const ItemLayoutExampleTruncateShorthand = ({ knobs }) => (
  <div style={{ width: knobs.width }}>
    <ItemLayout
      debug={knobs.debug}
      media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
      header="Dante Schneider - Super long title here"
      headerMedia="5:22:40 PM"
      content="The GB pixel is down, navigate the virtual interface!"
      contentMedia="!!"
      endMedia={ellipsis}
      truncateHeader={knobs.truncateHeader}
      truncateContent={knobs.truncateContent}
    />
  </div>
)

export default ItemLayoutExampleTruncateShorthand
