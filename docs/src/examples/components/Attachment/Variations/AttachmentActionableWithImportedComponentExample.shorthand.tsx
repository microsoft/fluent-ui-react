import React from 'react'
import { Attachment } from '@stardust-ui/react'
import Button from '@material-ui/core/Button'

const Example = () => (
  <Attachment
    icon="file image outline"
    header="Picture.jpg"
    description="800 Kb"
    action={
      <Button color="primary" onClick={e => alert('Open File clicked!')}>
        Open
      </Button>
    }
    progress="100"
  />
)

export default Example
