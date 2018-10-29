import * as React from 'react'
import { footerMenu, footerMenuItem, footerText } from './styles'
import siteVars from './styles/siteVariables'
import { Divider, Menu, Image, Provider, Text } from '@stardust-ui/react'
import { pxToRem } from '../../../../src/lib'
import * as Dusty from './dusties'
import { dustify } from './utils'

const Footer = props => {
  return (
    <div className={props.className}>
      <Provider
        theme={{
          componentStyles: {
            Menu: {
              root: footerMenu,
            },
            MenuItem: {
              root: footerMenuItem,
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
              {
                content: 'Code of Conduct',
                styles: { color: siteVars.green },
                key: 'code of conduct',
              },
              {
                content: 'General Terms and Conditions',
                styles: { color: siteVars.green },
                key: 'terms',
              },
              { content: 'Privacy Policy', styles: { color: siteVars.green }, key: 'privacy' },
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
    </div>
  )
}

export default dustify(Footer)
