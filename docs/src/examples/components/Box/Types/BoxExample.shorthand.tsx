import React from 'react'
import { Design } from '@stardust-ui/react'

const BoxShorthandExample = () => (
  <Design
    config={{
      margin: '20px',
    }}
  >
    {({ className }) => {
      console.log(className)
      return <div className={className}>inside Design</div>
    }}
  </Design>
)

export default BoxShorthandExample
