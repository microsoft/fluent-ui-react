import * as React from 'react'
import { Button } from '@stardust-ui/react'

class CallingButtons extends React.Component {
  public render() {
    return (
      <div style={{ display: 'inline-flex' }}>
        <Button.Group
          circular
          buttons={['call-video', 'call'].map((name, index) => ({
            key: `${index}-${name}`,
            title: name === 'call-video' ? 'Video call' : 'Audio call',
            icon: {
              name,
              size: 'large',
              variables: siteVars => ({ color: siteVars.white, margin: 'auto 8px' }),
            },
            primary: true,
          }))}
          styles={{ marginRight: '1rem' }}
        />
      </div>
    )
  }
}

export default CallingButtons
