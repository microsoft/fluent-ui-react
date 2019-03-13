import { createComponent, Icon, Text, Flex } from '@stardust-ui/react'
import * as React from 'react'

interface LabelledButtonProps {
  iconName: string
  label: string
  active: boolean
  onClick?: (event: React.SyntheticEvent) => void
}

const LabelledButton = createComponent<LabelledButtonProps>({
  displayName: 'LabelledButton',
  render: ({ stardust, ...props }) => {
    const { iconName, label, onClick } = props
    return (
      <Flex column gap="gap.small" hAlign="center" onClick={onClick}>
        <Icon name={iconName} size="large" />
        <Text as="div" content={label} size="small" />
      </Flex>
    )
  },
})
export default LabelledButton
