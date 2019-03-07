import { pxToRem } from 'src/lib'

describe('fontSizeUtility', () => {
  describe('pxToRem', () => {
    it('returns 1rem for 16px by default, as 16px is considered to be a default font size.', () => {
      expect(pxToRem(16)).toEqual('1rem')
    })

    it('returns 1rem for 10px with a default HTML font size of 10px.', () => {
      expect(pxToRem(10, 10)).toEqual('1rem')
    })

    it('returns 0.714rem with a base font size of 14px.', () => {
      expect(pxToRem(10, 14)).toEqual('0.7143rem')
    })

    it('returns 0rem when pxToRem is called with 0.', () => {
      expect(pxToRem(0)).toEqual('0rem')
    })
  })
})
