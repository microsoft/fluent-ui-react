import * as React from 'react'
import { Text as StardustUIText } from '@fluentui/react'

const Text = props => {
  const { muted, ...restProps } = props
  return <StardustUIText {...restProps} styles={{ ...(muted && { color: '#888' }) }} />
}

export default Text
