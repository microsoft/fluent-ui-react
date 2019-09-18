import { createComponent, Icon, Text, Flex } from '@stardust-ui/react'
import * as React from 'react'

interface LabelledButtonProps {
  iconName: string
  label: string
  onClick?: (event: React.SyntheticEvent) => void
}

const ComponentButton = createComponent<LabelledButtonProps>({
  displayName: 'ComponentButton',
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
export default ComponentButton
