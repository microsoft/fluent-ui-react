import { useBooleanKnob, useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Button } from '@stardust-ui/react'
import * as React from 'react'

const ButtonPlayground: React.FunctionComponent = () => {
  const [content] = useStringKnob({
    name: 'content',
    initialValue: 'A sample Button',
  })

  const [icon] = useSelectKnob({
    name: 'icon',
    initialValue: 'camera',
    values: ['book', 'camera'],
  })
  const [iconPosition] = useSelectKnob({
    name: 'iconPosition',
    initialValue: 'before',
    values: ['before', 'after'],
  })

  const [primary] = useBooleanKnob({ name: 'primary' })
  const [text] = useBooleanKnob({ name: 'text' })

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
