import * as React from 'react'
import { TextArea } from '@stardust-ui/react'
import { useStringKnob } from '@stardust-ui/docs-components'

const TextAreaValueExample: React.FC = () => {
  const [value] = useStringKnob({ name: 'value', initialValue: 'Hello World!' })
  return <TextArea value={value} />
}

export default TextAreaValueExample
