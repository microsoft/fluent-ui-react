import { implementsShorthandProp, isConformant } from '../../commonTests'

import Avatar from '@fluentui/react/src/components/Avatar/Avatar'
import Label from '@fluentui/react/src/components/Label/Label'
import Image from '@fluentui/react/src/components/Image/Image'

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
