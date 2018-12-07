import { createComponent, Icon, Text } from '@stardust-ui/react'
import * as React from 'react'

interface LabelledButtonProps {
  iconName: string
  label: string
  active: boolean
}

const centered = {
  textAlign: 'center',
}

const LabelledButton: React.SFC<LabelledButtonProps> = createComponent<LabelledButtonProps>({
  displayName: 'LabelledButton',
  render: ({ stardust, ...props }) => {
    const { iconName, label, active } = props
    return (
      <div style={centered}>
        <Icon name={iconName} styles={{ color: active ? 'green' : 'grey', marginBottom: '10px' }} />
        <br />
        <Text content={label} styles={{ color: active ? 'green' : 'grey' }} />
      </div>
    )
  },
})
export default LabelledButton
