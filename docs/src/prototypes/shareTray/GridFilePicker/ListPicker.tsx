import { Menu, Box, Text, Flex, Avatar, menuBehavior, FocusZoneDirection } from '@stardust-ui/react'
import * as React from 'react'
import { GridPickerProps } from './GridFilePicker'

const bidirectional = props => {
  const behavior = menuBehavior(props)
  behavior.focusZone.props.direction = FocusZoneDirection.bidirectional
  return behavior
}

class ListPicker extends React.Component<GridPickerProps> {
  render() {
    const { role, orientation, roleDescription, items } = this.props

    return (
      <Menu
        accessibility={bidirectional}
        as="div"
        variables={{
          activeBackgroundColor: 'transparent',
          borderColor: 'transparent',
          horizontalPadding: `0px 3px 1px 3px`,
          resetHeight: true,
        }}
        defaultActiveIndex={0}
        role={role}
        aria-orientation={orientation}
        aria-roledescription={roleDescription}
        items={items.map(this.itemProps)}
      />
    )
  }

  itemProps = item => {
    const {
      fileName,
      title,
      backgroundColor,
      roleDescription,
      role,
      wrapperRole,
      positionSuffix,
    } = item
    return {
      'data-is-focusable': true,
      onClick: () => {
        alert(`${title} ${role} Clicked!`)
      },
      'aria-roledescription': roleDescription,
      role,
      wrapper: wrapperRole ? { as: 'div', role: wrapperRole } : null,
      styles: { ':focus': { outline: '2px solid' } },
      content: (
        <Flex column gap="gap.small">
          <Box
            styles={{
              backgroundColor,
              textAlign: 'center',
              width: '100px',
              heighth: '100px',
              padding: '20%',
              color: '#fff',
            }}
            content={
              <Avatar
                image={{
                  src: `public/images/avatar/large/${fileName}.jpg`,
                  alt: title + (positionSuffix || ''),
                }}
                status={{
                  color: 'green',
                  icon: 'check',
                  title: 'Available',
                  variables: {
                    statusBorderColor: '#fff',
                  },
                }}
              />
            }
          />

          <Text size="small" aria-hidden="true">
            {fileName}
          </Text>
        </Flex>
      ),
    }
  }
}

export default ListPicker
