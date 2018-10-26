import * as React from 'react'
import { Menu, Image, Provider, Text } from '@stardust-ui/react'
import Divider from './Divider'
import { footer, footerMenu, footerMenuItem, footerText, green } from './styles'
import { pxToRem } from '../../../../src/lib'
import Dusty from './dusties'
import { footer as md_footer } from './styles/materialStyles'
import { mergeStyles } from './utils'

export default () => {
  return (
    <Dusty.div styles={mergeStyles(footer, md_footer)}>
      <Provider
        theme={{
          componentStyles: {
            MenuItem: {
              root: footerMenuItem,
            },
            Menu: {
              root: footerMenu,
            },
          },
          componentVariables: {
            Menu: {
              defaultActiveColor: green,
              defaultActiveBackgroundColor: 'black',
            },
          },
        }}
      >
        <>
          <Dusty.div
            styles={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '45px 0 0 0',
            }}
          >
            {'Organized with <love/> by'}
            <Image
              src="https://reactiveconf.com/images/vacuum_footer.png"
              variables={{ height: pxToRem(50) }}
            />
          </Dusty.div>
          <Menu
            styles={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
            items={[
              { content: 'Code of Conduct', styles: { color: green } },
              { content: 'General Terms and Conditions', styles: { color: green } },
              { content: 'Privacy Policy', styles: { color: green } },
            ]}
          />
        </>
      </Provider>
      <Divider />
      <Text
        content="VacuumLabs is a team of modern backend, web, and mobile development technology experts obsessed with delivering the future to our partners and clients."
        styles={footerText}
        as="div"
      />
    </Dusty.div>
  )
}
