import { useBooleanKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Checkbox } from '@stardust-ui/react'
import * as React from 'react'

const CheckboxPlayground: React.FunctionComponent = () => {
  const [checked, setChecked] = useBooleanKnob({ name: 'checked' })
  const [disabled] = useBooleanKnob({ name: 'disabled' })
  const [toggle] = useBooleanKnob({ name: 'toggle' })

  const [label] = useStringKnob({
    name: 'label',
    initialValue: 'Make profile visible',
  })

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      label={label}
      toggle={toggle}
      onChange={(e, data) => setChecked(data.checked)}
    />
  )
}

export default CheckboxPlayground
