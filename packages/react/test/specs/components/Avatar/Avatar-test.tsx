import { implementsShorthandProp, isConformant } from '../../commonTests'

import { Avatar, Label, Image } from '@fluentui/react'

const avatarImplementsShorthandProp = implementsShorthandProp(Avatar)
const { getInitials } = (Avatar as any).defaultProps

describe('Avatar', () => {
  isConformant(Avatar)
  avatarImplementsShorthandProp('label', Label)
  avatarImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })

  describe('generateInitials', () => {
    it('generateInitials should show just the initials of the first and last words in the name', () => {
      expect(getInitials('John Middle Doe')).toEqual('JD')
    })

    it('generateInitials removes the text inside brackets', () => {
      expect(getInitials('John Doe (Working position)')).toEqual('JD')
      expect(getInitials('John Doe {Working position}')).toEqual('JD')
      expect(getInitials('John Doe [Working position]')).toEqual('JD')
    })
  })
})
