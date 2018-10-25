import * as React from 'react'
import { Divider, Menu, Image, Provider, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'
import { footerStyles, footerMenuItemStyles, footerMenuStyles, footerTextStyles } from './styles'
import { pxToRem } from '../../../../src/lib'

export default () => {
  return (
    <Slot styles={footerStyles}>
      <Provider
        theme={{
          componentStyles: {
            Menu: {
              root: footerMenuStyles,
            },
            MenuItem: {
              root: footerMenuItemStyles,
            },
          },
        }}
      >
        <Menu
          type="primary"
          items={[
            'Organized with <love/> by',
            <Image
              src="https://reactiveconf.com/images/vacuum_footer.png"
              variables={{ height: pxToRem(50) }}
            />,
            'Code of Conduct',
            'General Terms and Conditions',
            'Privacy Policy',
          ]}
        />
      </Provider>
      <Divider />
      <Text
        content="VacuumLabs is a team of modern backend, web, and mobile development technology experts obsessed with delivering the future to our partners and clients."
        styles={footerTextStyles}
        as="div"
      />
    </Slot>
  )
}
