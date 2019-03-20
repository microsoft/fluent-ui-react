import { useBooleanKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Button } from '@stardust-ui/react'
import * as React from 'react'

const ButtonPlayground: React.FunctionComponent = () => {
  const [primary] = useBooleanKnob('primary', false, <code>primary</code>)
  const [text] = useBooleanKnob('text', false, <code>text</code>)
  const [content] = useStringKnob('content', 'A sample Button', 'Visible Text')

  return <Button content={content} primary={primary} text={text} />
}

export default ButtonPlayground
