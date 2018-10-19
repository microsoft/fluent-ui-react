import * as React from 'react'
import Slot from '../../../../src/components/Slot/Slot'
import { Menu, Image, Provider, Text } from '@stardust-ui/react'
import { pxToRem } from '../../../../src/lib'
import Divider from './Divider'

export default () => {
  return (
    <Slot
      styles={{
        background: 'black',
        height: '160px',
        position: 'relative',
        bottom: '0px',
        textAlign: 'center',
      }}
    >
      <Provider
        theme={{
          componentStyles: {
            MenuItem: {
              root: () => ({
                '::before': { background: 'transparent' },
                ':hover': { background: 'black', color: '#56b36d' },
                color: 'white',
                fontSize: pxToRem(14),
                marginTop: pxToRem(20),
                fontWeight: 'bold',
              }),
            },
            Menu: {
              root: () => ({
                border: 'transparent',
                height: pxToRem(70),
                background: 'black',
                position: 'relative',
                margin: 'auto',
                width: '990px',
              }),
            },
          },
        }}
      >
        <Menu
          items={[
            'Organized with <love/> by',
            <Image
              src="https://reactiveconf.com/images/vacuum_footer.png"
              variables={{ height: '50px' }}
              styles={{ marginTop: '10px' }}
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
        styles={{ color: '#56b36d', width: '70%', margin: 'auto' }}
        as="div"
      />
    </Slot>
  )
}
