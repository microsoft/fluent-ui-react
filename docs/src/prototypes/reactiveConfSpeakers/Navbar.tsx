import * as React from 'react'
import { Menu, Provider, Image, Button } from '@stardust-ui/react'

import { navbarMenuItem, navbarMenu, navbarButton } from './styles'
import siteVar from './styles/siteVariables'
import { dustify } from './utils'

const Navbar = props => (
  <Provider
    theme={{
      componentStyles: {
        MenuItem: {
          root: navbarMenuItem,
        },
        Menu: {
          root: navbarMenu,
        },
      },
      componentVariables: {
        Menu: {
          defaultActiveColor: siteVar.green,
          defaultActiveBackgroundColor: siteVar.blue06,
        },
      },
    }}
  >
    <div className={props.className}>
      <Image src="https://reactiveconf.com/images/logo.svg" variables={{ height: '50px' }} />
      <Menu
        items={[
          { content: 'SPEAKERS', styles: { color: siteVar.green } },
          'WORKSHOPS',
          'SCHEDULE',
          'VENUES',
          'VOLUNTEERS',
          'CONTACT',
          { content: 'OCT 29-31, 2018', styles: { color: siteVar.green } },
        ]}
      />
      <Button content="BUY TICKETS" styles={navbarButton} />
    </div>
  </Provider>
)

export default dustify(Navbar)
