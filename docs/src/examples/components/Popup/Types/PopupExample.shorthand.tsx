import * as React from 'react'
import { Button, Loader, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const ButtonExampleEmphasis = () => {
  const loader = <Loader />
  const [content, setContent] = React.useState(loader)

  setTimeout(() => {
    if (content === loader) {
      setContent(<Button content="has focus?" onClick={() => alert('I was clicked')} />)
    }
  }, 30000)

  return (
    <div>
      <Popup
        accessibility={popupFocusTrapBehavior}
        trigger={<Button content="Click Me!" primary />}
        content={{ content }}
      />
    </div>
  )
}

export default ButtonExampleEmphasis
