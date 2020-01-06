import * as React from 'react'
import { Button } from '@fluentui/react'

const ButtonGroupExampleShorthand = () => (
  <Button.Group
    buttons={[
      { key: 'emoji', icon: { name: 'emoji' }, iconOnly: true, title: 'Emoji' },
      { key: 'translation', icon: { name: 'translation' }, iconOnly: true, title: 'Translation' },
      { key: 'play', icon: { name: 'play' }, iconOnly: true, title: 'Play' },
    ]}
  />
)

export default ButtonGroupExampleShorthand
