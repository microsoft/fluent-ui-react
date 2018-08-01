import { isConformant } from 'test/specs/commonTests'

import Avatar from 'src/components/Avatar/Avatar'

describe('Avatar', () => {
  isConformant(Avatar)

  describe('generateInitials', () => {
    it('generateInitials should show just the initials of the first and last words in the name', () => {
      expect(Avatar.generateInitials('John Middle Doe')).toEqual('JD')
    })

    it('generateInitials removes the text inside brackets', () => {
      expect(Avatar.generateInitials('John Doe (Working position)')).toEqual('JD')
      expect(Avatar.generateInitials('John Doe {Working position}')).toEqual('JD')
      expect(Avatar.generateInitials('John Doe [Working position]')).toEqual('JD')
    })
  })
})
