import * as React from 'react'
import { ShorthandValue, ShorthandRenderCallback } from '../../types/utils'
import { CreateShorthandOptions } from './factories'
import Slot from '../components/Slot/Slot'
import Text from '../components/Text/Text'

export const generateContentSlot = (
  content: ShorthandValue | ShorthandRenderCallback,
  options: CreateShorthandOptions,
) => {
  if (typeof content === 'string') {
    return Text.create(content, options)
  }
  return Slot.create(content, options)
}

export const generateContentElement = (content: React.ReactNode) => {
  if (typeof content === 'string') {
    return Text.create(content)
  }
  return content
}
