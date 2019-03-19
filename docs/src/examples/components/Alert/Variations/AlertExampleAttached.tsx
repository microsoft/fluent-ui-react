import * as React from 'react'
import { Alert, Input } from '@stardust-ui/react'

const AlertExampleShorthand = () => (
  <>
    <Alert attached>This is a top attached alert</Alert>
    <Input fluid placeholder="Name..." />
    <br /> <br />
    <Input fluid placeholder="Surname..." />
    <Alert attached="bottom">This is a bottom attached alert</Alert>
  </>
)

export default AlertExampleShorthand
