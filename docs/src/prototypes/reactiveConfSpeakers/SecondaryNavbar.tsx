import * as React from 'react'
import { Menu, Provider, Image, Button, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'
import {
  imageStyles,
  secondaryNavbarMenuItemStyles,
  secondaryNavbarMenuStyles,
  secondaryNavbarButtonStyles,
  secondaryNavbarScrollingItemStyles,
  green,
  secondaryNavbarBackground,
} from './styles'

export default props => {
  const { scrolling } = props
  return (
    <Provider
      theme={{
        componentStyles: {
          MenuItem: {
            root: secondaryNavbarMenuItemStyles,
          },
          Menu: {
            root: () => ({
              ...secondaryNavbarMenuStyles,
              ...(scrolling && {
                position: 'fixed',
                top: '0px',
              }),
            }),
          },
        },
        componentVariables: {
          Menu: {
            defaultActiveColor: green,
            defaultActiveBackgroundColor: secondaryNavbarBackground,
          },
        },
      }}
    >
      <>
        <Menu
          items={[
            <Image
              src="https://reactiveconf.com/images/logo.svg"
              variables={{ height: '50px' }}
              styles={imageStyles}
            />,
            { content: 'SPEAKERS', styles: { color: green } },
            'WORKSHOPS',
            'SCHEDULE',
            'VENUES',
            'VOLUNTEERS',
            'CONTACT',
            ,
            { content: 'OCT 29-31, 2018', styles: { color: green } },
            <Button content="BUY TICKETS" styles={secondaryNavbarButtonStyles} />,
          ]}
        />
        {scrolling && (
          <Slot
            styles={secondaryNavbarScrollingItemStyles}
            content={
              <>
                <Text content="Late Birds are gone! Be our " styles={{ color: '#060b24' }} />
                <Text content="Lazy Bird!" weight="semibold" />
              </>
            }
          />
        )}
      </>
    </Provider>
  )
}
