import * as React from 'react'
import { TextArea } from '@stardust-ui/react'

const maxLength = 5

const TextAreaMaxLengthExample = () => (
  <>
    <TextArea
      placeholder={`No more than ${maxLength} letters can be here...`}
      maxLength={maxLength}
    />
  </>
)

export default TextAreaMaxLengthExample
