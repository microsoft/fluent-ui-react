import { useBooleanKnob } from '@fluentui/docs-components'
import { ItemLayout, Image } from '@fluentui/react'
import * as React from 'react'

const ItemLayoutExampleShorthand = () => {
  const [debug] = useBooleanKnob({ name: 'debug', initialValue: true })

  return (
    <ItemLayout
      media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      contentMedia="!!"
      endMedia={<span>&hellip;</span>}
      debug={debug}
    />
  )
}

export default ItemLayoutExampleShorthand
