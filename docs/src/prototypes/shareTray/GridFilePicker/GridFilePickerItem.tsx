import { Box, Flex, Icon, Text, Image } from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'

import * as React from 'react'

export interface GridPickerItemProps {
  title?: string
  icon: string
  onClick?: (e) => void
  fileName?: string
  backgroundColor?: string
  role?: string
  roleDescription?: string
  image?: boolean
  wrapperRole?: string
  positionSuffix?: string
}

const imageButtonStyles = {
  width: '145px',
  height: '100px',
}

const iconOnlyButtonStyles = {
  width: '50px',
  height: '50px',
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
      roleDescription,
      image = false,
      wrapperRole = '',
      positionSuffix = '',
    } = this.props

    const itemProps = {
      role,
      style: image ? iconOnlyButtonStyles : imageButtonStyles,
      onClick,
    }

    const eventHandlers = {
      onClick: () => {
        alert(`${title} Clicked!`)
      },
      onKeyDown: event => {
        const keycode = keyboardKey.getCode(event)
        const isEnterOrSpace = keycode === keyboardKey.Enter || keycode === keyboardKey.Spacebar
        if (isEnterOrSpace) {
          event.preventDefault()
          alert(`${title} Clicked!`)
        }
      },
    }

    const item = (
      <li
        {...itemProps}
        {...eventHandlers}
        data-is-focusable={true}
        aria-roledescription={roleDescription}
        aria-label={title + positionSuffix}
      >
        {image ? (
          <Image alt={title} src={`public/images/avatar/large/${fileName}.jpg`} fluid />
        ) : (
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
        )}
      </li>
    )

    return wrapperRole ? <div role={wrapperRole}>{item}</div> : item
  }
}

export default GridImagePickerItem
