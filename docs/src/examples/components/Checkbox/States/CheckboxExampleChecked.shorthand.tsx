import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Checkbox } from '@stardust-ui/react'
import * as React from 'react'

const CheckboxExampleChecked = () => {
  const [checked] = useBooleanKnob({ name: 'checked', initialValue: true })

  return (
    <>
      <Checkbox checked={checked} label="Checked" />
      <Checkbox checked={checked} label="Checked toggle" toggle />
    </>
  )
}

export default CheckboxExampleChecked
