import { createComponent, Icon, Text, ICSSInJSStyle } from '@stardust-ui/react'
import * as React from 'react'

interface LabelledButtonProps {
  iconName: string
  label: string
  active: boolean
  onClick?: (event: React.SyntheticEvent) => void
}

const centered: ICSSInJSStyle = {
  textAlign: 'center',
}

const LabelledButton: React.SFC<LabelledButtonProps> = createComponent<LabelledButtonProps>({
  displayName: 'LabelledButton',
  render: ({ stardust, ...props }) => {
    const { iconName, label, active, onClick } = props
    return (
      <div style={centered} onClick={onClick}>
        <Icon
          name={iconName}
          styles={{ color: active ? 'green' : 'grey', marginBottom: '10px', border: 0 }}
        />
        <br />
        <Text content={label} styles={{ color: active ? 'green' : 'grey' }} />
      </div>
    )
  },
})
export default LabelledButton
