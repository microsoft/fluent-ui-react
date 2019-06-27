import * as React from 'react'
import { Slider } from '@stardust-ui/react'
import { useBooleanKnob, useStringKnob, useSelectKnob } from '@stardust-ui/docs-components'

const SliderPlayground: React.FunctionComponent = () => {
  const [min] = useStringKnob({ name: 'min', initialValue: '0' })
  const [max] = useStringKnob({ name: 'max', initialValue: '50' })
  const [step] = useStringKnob({ name: 'step', initialValue: '5' })
  const [value, setValue] = useStringKnob({ name: 'value', initialValue: '10' })

  const [disabled] = useBooleanKnob({ name: 'disabled' })
  const [fluid] = useBooleanKnob({ name: 'fluid' })
  const [vertical] = useBooleanKnob({ name: 'vertical' })

  const [icon] = useSelectKnob({ name: 'icon', initialValue: 'mic', values: ['mic', 'camera'] })
  const [iconPosition] = useSelectKnob({
    name: 'iconPosition',
    initialValue: 'start',
    values: ['start', 'end'],
  })

  return (
    <Slider
      disabled={disabled}
      fluid={fluid}
      icon={icon}
      iconPosition={iconPosition}
      min={min}
      max={max}
      step={step}
      value={value}
      vertical={vertical}
      onChange={(e, data) => setValue(String(data.value))}
    />
  )
}

export default SliderPlayground
