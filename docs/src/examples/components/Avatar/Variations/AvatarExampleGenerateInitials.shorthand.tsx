import React from 'react'
import { Avatar } from '@stardust-ui/react'

const generateInitials = (name: string) => {
  if (!name) {
    return ''
  }

  return name
    .split(' ')
    .filter(item => item !== '')
    .map(name => `${name.charAt(0)}.`)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
}

const AvatarExampleNameShorthand = () => (
  <Avatar status="Available" name="John Doe" generateInitials={generateInitials} />
)

export default AvatarExampleNameShorthand
