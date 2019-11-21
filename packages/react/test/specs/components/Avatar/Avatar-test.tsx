import { implementsShorthandProp, isConformant } from 'test/specs/commonTests'

import Avatar from 'src/components/Avatar/Avatar'
import Label from 'src/components/Label/Label'
import Image from 'src/components/Image/Image'

const avatarImplementsShorthandProp = implementsShorthandProp(Avatar)

describe('Avatar', () => {
  isConformant(Avatar)
  avatarImplementsShorthandProp('label', Label)
  avatarImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })

  describe('generateInitials', () => {
    it('generateInitials should show just the initials of the first and last words in the name', () => {
      expect(Avatar.defaultProps.getInitials('John Middle Doe')).toEqual('JD')
    })

    it('generateInitials removes the text inside brackets', () => {
      expect(Avatar.defaultProps.getInitials('John Doe (Working position)')).toEqual('JD')
      expect(Avatar.defaultProps.getInitials('John Doe {Working position}')).toEqual('JD')
      expect(Avatar.defaultProps.getInitials('John Doe [Working position]')).toEqual('JD')
    })
  })
})
