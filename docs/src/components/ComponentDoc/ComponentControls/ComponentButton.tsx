import { createComponent, Icon, Text } from '@stardust-ui/react'
import * as React from 'react'

export const LabelledButton = createComponent({
  displayName: 'LabelledButton',
  render: ({ stardust, className, children }) => {
    const { iconName, label } = children
    return (
      <div>
        <Icon name={iconName} />
        <Text content={label} />
      </div>
    )
  },
})
