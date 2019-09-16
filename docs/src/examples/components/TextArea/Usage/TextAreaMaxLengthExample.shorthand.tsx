import * as React from 'react'
import { TextArea } from '@stardust-ui/react'

const TextAreaMaxLengthExample = () => (
  <TextArea placeholder="No more than 50 characters can be here" maxLength={50} />
)

export default TextAreaMaxLengthExample
