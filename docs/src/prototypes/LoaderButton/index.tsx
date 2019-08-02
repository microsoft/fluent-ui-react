import * as React from 'react'
import { Button } from '@stardust-ui/react'
import chatProtoStyle from '.././chatPane/chatProtoStyle'

const ButtonExampleLoading = () => {
  const [loading, setLoading] = React.useState(false)

  const onClick = () => {
    if (!loading) {
      setLoading(true)
      document.getElementById('ariaLive').innerText = 'Start uploading...'
    }
    setTimeout(() => {
      setLoading(false)
      document.getElementById('ariaLive').innerText = 'Finished upload...'
    }, 6000)
  }

  return (
    <div>
      <Button content="first" />
      <Button content="second" />
      <Button
        onClick={onClick}
        loading={loading}
        content={loading ? 'Uploading...' : 'Press for upload'}
      />
      <div
        id="ariaLive"
        aria-live="polite"
        aria-atomic="true"
        style={chatProtoStyle.screenReaderContainerStyles}
      />
    </div>
  )
}

export default ButtonExampleLoading
