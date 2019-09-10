import * as React from 'react'
import { TextArea } from '@stardust-ui/react'

const TextAreaMaxLengthExample = () => (
  <>
    <TextArea placeholder={`No more than 5 letters can be here...`} maxLength={5} />
  </>
)

export default TextAreaMaxLengthExample
