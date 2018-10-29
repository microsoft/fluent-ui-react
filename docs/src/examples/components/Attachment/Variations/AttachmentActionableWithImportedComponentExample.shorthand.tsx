import React from 'react'
import { Attachment, Icon } from '@stardust-ui/react'
import Button from '@material-ui/core/Button'

const handleClick = message => alert(`'${message}' clicked!`)

const Example = () => (
  <div>
    {/* Going further - even third-party button components could be used */}
    {/* - note famous 'ripple' effect Material UI Button by clicking on it */}
    <Attachment
      icon="file image outline"
      header="Picture.jpg"
      description="460/800 Kb"
      action={<Button color="primary">Wait...</Button>}
      progress="50"
    />

    <Icon name="arrow right" />

    {/* With event handler being bound */}
    <Attachment
      icon="file image outline"
      header="Picture.jpg"
      description="800 Kb"
      action={
        <Button color="primary" onClick={e => handleClick('Open File')}>
          Open
        </Button>
      }
      progress="100"
    />
  </div>
)

export default Example
