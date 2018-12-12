import { createComponent, Icon, Button, Text, ICSSInJSStyle } from '@stardust-ui/react'
import * as React from 'react'

interface LabelledButtonProps {
  iconName: string
  label: string
  active: boolean
}

const centered: ICSSInJSStyle = {
  textAlign: 'center',
}

const LabelledButton: React.SFC<LabelledButtonProps> = createComponent<LabelledButtonProps>({
  displayName: 'LabelledButton',
  render: ({ stardust, ...props }) => {
    const { iconName, label, active } = props
    return (
      <div style={centered}>
        <Button
          iconOnly
          icon={iconName}
          styles={{ color: active ? 'green' : 'grey', marginBottom: '10px', border: 0 }}
        />
        <br />
        <Text content={label} styles={{ color: active ? 'green' : 'grey' }} />
      </div>
    )
  },
})
export default LabelledButton
