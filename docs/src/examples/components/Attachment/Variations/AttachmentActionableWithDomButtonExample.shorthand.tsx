import React from 'react'
import { Attachment } from '@stardust-ui/react'

const handleClick = () => alert('Attachment was clicked')

const Example = () => (
  <>
    {/* But it could be easily customized so that regular HTML <button/> will fill the slot. */}
    {/* Note that 'click' event handler is still properly bound. */}
    <Attachment
      icon="file word outline"
      header="Document.docx"
      action={<button onClick={handleClick}>x</button>}
    />
  </>
)

export default Example
