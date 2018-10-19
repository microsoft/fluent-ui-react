import * as React from 'react'
import { Menu, Provider } from '@stardust-ui/react'
import { pxToRem } from '../../../../src/lib'

export default () => (
  <Provider
    theme={{
      componentStyles: {
        MenuItem: {
          root: () => ({
            '::before': { background: 'transparent' },
            ':hover': { background: 'black', color: '#56b36d' },
            color: 'white',
            fontSize: pxToRem(12),
            marginTop: `-${pxToRem(8)}`,
          }),
        },
        Menu: {
          root: () => ({
            border: 'transparent',
            height: pxToRem(24),
            background: 'black',
            position: 'relative',
            zIndex: 30,
            '-webkit-transform': 'translateZ(10px)',
            transform: 'translateZ(10px)',
          }),
        },
      },
    }}
  >
    <>
      <Menu
        items={[
          'Past Events',
          'Blog',
          'Partners',
          'Archive',
          'Videos',
          'Handbook',
          { content: 'About Us', styles: { color: '#56b36d' } },
        ]}
      />
    </>
  </Provider>
)
