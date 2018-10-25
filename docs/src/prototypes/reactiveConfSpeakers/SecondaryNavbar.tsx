import * as React from 'react'
import { Menu, Image, Button, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'
import {
  secondaryNavbarMenuStyles,
  secondaryNavbarButtonStyles,
  secondaryNavbarScrollingItemStyles,
} from './styles'

export default props => {
  const { scrolling } = props
  return (
    <>
      <Menu
        defaultActiveIndex={1}
        type="primary"
        items={[
          <Image src="https://reactiveconf.com/images/logo.svg" variables={{ height: '50px' }} />,
          'SPEAKERS',
          'WORKSHOPS',
          'SCHEDULE',
          'VENUES',
          'VOLUNTEERS',
          'CONTACT',
          { content: 'OCT 29-31, 2018', variables: siteVars => ({ defaultColor: siteVars.green }) },
          <Button content="BUY TICKETS" styles={secondaryNavbarButtonStyles} />,
        ]}
        styles={{
          ...secondaryNavbarMenuStyles,
          ...(scrolling && {
            position: 'fixed',
            top: '0px',
          }),
        }}
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
  )
}
