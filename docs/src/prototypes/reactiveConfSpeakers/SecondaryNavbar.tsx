import * as React from 'react'
import { Menu, Provider, Image, Button, Text } from '@stardust-ui/react'
import { pxToRem } from '../../../../src/lib'
import Slot from '../../../../src/components/Slot/Slot'

export default props => {
  const { scrolling } = props
  return (
    <Provider
      theme={{
        componentStyles: {
          MenuItem: {
            root: () => ({
              '::before': { background: 'transparent' },
              ':hover': { background: 'rgb(6, 11, 36, 0.6)', color: '#56b36d' },
              color: 'white',
              fontSize: pxToRem(16),
              marginTop: pxToRem(15),
            }),
          },
          Menu: {
            root: () => ({
              zIndex: 10,
              marginBottom: 0,
              padding: 0,
              textTransform: 'uppercase',
              border: 'none',
              transform: 'translateZ(0px)',
              height: pxToRem(70),
              ...(scrolling && {
                position: 'fixed',
                top: '0px',
              }),
              backgroundColor: 'rgb(6, 11, 36, 0.6)',
              width: '1150px',
            }),
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
              styles={{ marginTop: '10px' }}
            />,
            { content: 'SPEAKERS', styles: { color: '#56b36d' } },
            'WORKSHOPS',
            'SCHEDULE',
            'VENUES',
            'VOLUNTEERS',
            'CONTACT',
            ,
            { content: 'OCT 29-31, 2018', styles: { color: '#56b36d' } },
            <Button
              content="BUY TICKETS"
              styles={{
                background: 'rgb(6, 11, 36, 0.6)',
                border: '3px solid #56b36d',
                borderRadius: '0px',
                color: 'white',
                fontSize: pxToRem(14),
                marginTop: pxToRem(20),
                padding: pxToRem(5),
              }}
            />,
          ]}
        />
        {scrolling && (
          <Slot
            styles={{
              width: '1150px',
              position: 'fixed',
              top: '70px',
              zIndex: 10,
              background: '#56b36d',
              textAlign: 'center',
            }}
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
