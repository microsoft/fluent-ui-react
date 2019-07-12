import * as React from 'react'
import { Slider } from '@stardust-ui/react'
import { useBooleanKnob, useStringKnob } from '@stardust-ui/docs-components'

const SliderPlayground: React.FunctionComponent = () => {
  const [min] = useStringKnob({ name: 'min', initialValue: '0' })
  const [max] = useStringKnob({ name: 'max', initialValue: '50' })
  const [step] = useStringKnob({ name: 'step', initialValue: '1' })
  const [value, setValue] = useStringKnob({ name: 'value', initialValue: '10' })

  const [disabled] = useBooleanKnob({ name: 'disabled' })
  const [fluid] = useBooleanKnob({ name: 'fluid' })
  const [vertical] = useBooleanKnob({ name: 'vertical' })

  return (
    <Slider
      disabled={disabled}
      fluid={fluid}
      min={min}
      max={max}
      step={step}
      value={value}
      vertical={vertical}
      onChange={(e, data) => setValue(data.value)}
    />
  )
}

export default SliderPlayground
