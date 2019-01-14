import * as React from 'react'
import Text from '../components/Text/Text'

export const generateContentElement = (content: React.ReactNode) => {
  if (typeof content === 'string') {
    return Text.create(content)
  }
  return content
}
