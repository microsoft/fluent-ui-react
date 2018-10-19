import * as React from 'react'
import Slot from '../../../../src/components/Slot/Slot'
import { Menu, Image, Provider, Text } from '@stardust-ui/react'
import Divider from './Divider'
import {
  footerStyles,
  footerMenuItemStyles,
  footerMenuStyles,
  footerTextStyles,
  imageStyles,
} from './styles'
import { pxToRem } from '../../../../src/lib'

export default () => {
  return (
    <Slot styles={footerStyles}>
      <Provider
        theme={{
          componentStyles: {
            MenuItem: {
              root: footerMenuItemStyles,
            },
            Menu: {
              root: footerMenuStyles,
            },
          },
        }}
      >
        <Menu
          items={[
            'Organized with <love/> by',
            <Image
              src="https://reactiveconf.com/images/vacuum_footer.png"
              variables={{ height: pxToRem(50) }}
              styles={imageStyles}
            />,
            { content: 'Code of Conduct', styles: { color: '#56b36d' } },
            { content: 'General Terms and Conditions', styles: { color: '#56b36d' } },
            { content: 'Privacy Policy', styles: { color: '#56b36d' } },
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
