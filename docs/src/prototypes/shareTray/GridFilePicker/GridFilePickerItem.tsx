import { Box, Flex, Icon, Text } from '@stardust-ui/react'

import * as React from 'react'

export interface GridPickerItemProps {
  title?: string
  icon: string
  onClick?: (e) => void
  fileName?: string
  backgroundColor?: string
  role?: string
  asMenuItem?: boolean
}

const imageButtonStyles = {
  width: '145px',
  height: '100px',
}

class GridImagePickerItem extends React.Component<GridPickerItemProps> {
  render() {
    const {
      title,
      onClick,
      fileName,
      icon,
      role = 'listitem',
      backgroundColor = '#252626',
    } = this.props

    const itemProps = {
      role,
      style: imageButtonStyles,
      onClick,
    }

    return (
      <li {...itemProps}>
        <Flex
          column
          gap="gap.small"
          {...{
            role: 'button',
            'data-is-focusable': true,
            'aria-label': title,
            'aria-roledescription': 'grid item',
          }}
        >
          <Box
            styles={{
              backgroundColor,
              textAlign: 'center',
            }}
            content={<Icon name={icon} styles={{ padding: '20%', color: '#fff' }} />}
          />

          <Text size="small" aria-hidden="true">
            {fileName}
          </Text>
        </Flex>
      </li>
    )
  }
}

export default GridImagePickerItem
