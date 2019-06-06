import { Box, Flex, Icon, Text } from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'

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
      <li
        {...itemProps}
        data-is-focusable={true}
        onClick={() => {
          alert('Item Clicked!')
        }}
        onKeyDown={event => {
          const keycode = keyboardKey.getCode(event)
          const isEnterOrSpace = keycode === keyboardKey.Enter || keycode === keyboardKey.Spacebar
          if (isEnterOrSpace) {
            event.preventDefault()
            alert('Item Clicked!')
          }
        }}
        aria-roledescription={'grid item'}
        aria-label={title}
      >
        <Flex column gap="gap.small">
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
