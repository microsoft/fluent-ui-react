import { useBooleanKnob } from '@stardust-ui/docs-components'
import { ItemLayout, Image } from '@stardust-ui/react'
import * as React from 'react'

const ItemLayoutExampleSelectionShorthand = () => {
  const [selection] = useBooleanKnob({ name: 'selection', initialValue: true })

  return (
    <ItemLayout
      selection={selection}
      media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
  )
}

export default ItemLayoutExampleSelectionShorthand
