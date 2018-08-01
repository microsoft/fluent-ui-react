import React from 'react'
import { Avatar } from '@stardust-ui/react'

const generateInitials = (name: string) => {
  if (!name) {
    return ''
  }

  let names = name.split(' ')
  names = names.filter(item => item !== '')

  return names
    .map(name => (name.length ? name.charAt(0) + '.' : ''))
    .reduce((accumulator, currentValue) => accumulator + currentValue)
}

const AvatarExampleNameShorthand = () => (
  <Avatar status="Available" name="John Doe" generateInitials={generateInitials} />
)

export default AvatarExampleNameShorthand
