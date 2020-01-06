import * as React from 'react'
import { Button } from '@fluentui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { key: 'emoji', icon: { name: 'emoji' }, primary: true, title: 'Emoji' },
      { key: 'translation', icon: { name: 'translation' }, title: 'Translation' },
      { key: 'play', icon: { name: 'play' }, primary: true, title: 'Play' },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
