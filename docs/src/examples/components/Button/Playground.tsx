import { useBooleanKnob, useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Button } from '@stardust-ui/react'
import * as React from 'react'

const ButtonPlayground: React.FunctionComponent = () => {
  const [content] = useStringKnob({
    displayName: <code>content</code>,
    name: 'content',
    initialValue: 'A sample Button',
  })

  const [icon] = useSelectKnob({
    displayName: <code>content</code>,
    name: 'camera',
    initialValue: 'camera',
    values: ['book', 'camera'],
  })
  const [iconPosition] = useSelectKnob({
    displayName: <code>iconPosition</code>,
    name: 'iconPosition',
    initialValue: 'before',
    values: ['before', 'after'],
  })

  const [primary] = useBooleanKnob({ displayName: <code>primary</code>, name: 'primary' })
  const [text] = useBooleanKnob({ displayName: <code>text</code>, name: 'text' })

  return (
    <Button
      content={content}
      icon={icon}
      /* TODO: better typings */
      iconPosition={iconPosition as any}
      primary={primary}
      text={text}
    />
  )
}

export default ButtonPlayground
