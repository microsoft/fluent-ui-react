import * as React from 'react'
import { Button, Popup } from '@fluentui/react'

const PopupExample = () => (
  <Popup content="Hello from popup!">
    <Button icon="more" title="Show popup" />
  </Popup>
)

export default PopupExample
