import * as React from 'react'
import { Text as StardustUIText } from '@stardust-ui/react'

const Text = props => {
  const { muted, ...rest } = props
  return <StardustUIText {...rest} styles={{ ...(muted && { color: '#888' }) }} />
}

export default Text
