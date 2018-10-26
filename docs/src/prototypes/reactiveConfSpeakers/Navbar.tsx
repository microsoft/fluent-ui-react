import * as React from 'react'
import { Menu, Provider, Image, Button } from '@stardust-ui/react'

import Dusty from './dusties'
import { navbarMenuItem, navbarMenu, navbarButton } from './styles'
import siteVar from './styles/siteVariables'
import { navbar as md_navbar } from './styles/materialStyles'
import { mergeStyles } from './utils'

export default props => {
  const { scrolling } = props
  return (
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
      <Dusty.div
        styles={mergeStyles(
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#261b34',
            padding: '5px 0',
            width: '100%',
            position: 'fixed',
            margin: '0 -125px',
            top: '0px',
            zIndex: 30,
          },
          md_navbar(scrolling),
        )}
      >
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
      </Dusty.div>
    </Provider>
  )
}
