import _ from 'lodash'
import computePopupPlacement from 'src/components/Popup/positioningHelper'
import { Position, Alignment } from 'src/components/Popup'
import { Placement } from 'popper.js'

type PositionTestInput = {
  align: Alignment
  position: Position
  expectedPlacement: Placement
  rtl?: boolean
}

describe('Popup', () => {
  const testPopupPosition = ({
    align,
    position,
    expectedPlacement,
    rtl = false,
  }: PositionTestInput) =>
    it(`Popup ${position} position is transformed to ${expectedPlacement} Popper's placement`, () => {
      const actualPlacement = computePopupPlacement({ align, position, rtl })
      expect(actualPlacement).toEqual(expectedPlacement)
    })

  const testPopupPositionInRtl = ({
    align,
    position,
    expectedPlacement,
  }: PositionTestInput & { rtl?: never }) =>
    testPopupPosition({ align, position, expectedPlacement, rtl: true })

  describe('handles Popup position correctly in ltr', () => {
    testPopupPosition({ position: 'above', align: 'start', expectedPlacement: 'top-start' })
    testPopupPosition({ position: 'above', align: 'center', expectedPlacement: 'top' })
    testPopupPosition({ position: 'above', align: 'end', expectedPlacement: 'top-end' })
    testPopupPosition({ position: 'below', align: 'start', expectedPlacement: 'bottom-start' })
    testPopupPosition({ position: 'below', align: 'center', expectedPlacement: 'bottom' })
    testPopupPosition({ position: 'below', align: 'end', expectedPlacement: 'bottom-end' })
    testPopupPosition({ position: 'before', align: 'top', expectedPlacement: 'left-start' })
    testPopupPosition({ position: 'before', align: 'center', expectedPlacement: 'left' })
    testPopupPosition({ position: 'before', align: 'bottom', expectedPlacement: 'left-end' })
    testPopupPosition({ position: 'after', align: 'top', expectedPlacement: 'right-start' })
    testPopupPosition({ position: 'after', align: 'center', expectedPlacement: 'right' })
    testPopupPosition({ position: 'after', align: 'bottom', expectedPlacement: 'right-end' })
  })

  describe('handles Popup position correctly in rtl', () => {
    testPopupPositionInRtl({ position: 'above', align: 'start', expectedPlacement: 'top-end' })
    testPopupPositionInRtl({ position: 'above', align: 'center', expectedPlacement: 'top' })
    testPopupPositionInRtl({ position: 'above', align: 'end', expectedPlacement: 'top-start' })
    testPopupPositionInRtl({ position: 'below', align: 'start', expectedPlacement: 'bottom-end' })
    testPopupPositionInRtl({ position: 'below', align: 'center', expectedPlacement: 'bottom' })
    testPopupPositionInRtl({ position: 'below', align: 'end', expectedPlacement: 'bottom-start' })
    testPopupPositionInRtl({ position: 'before', align: 'top', expectedPlacement: 'right-start' })
    testPopupPositionInRtl({ position: 'before', align: 'center', expectedPlacement: 'right' })
    testPopupPositionInRtl({ position: 'before', align: 'bottom', expectedPlacement: 'right-end' })
    testPopupPositionInRtl({ position: 'after', align: 'top', expectedPlacement: 'left-start' })
    testPopupPositionInRtl({ position: 'after', align: 'center', expectedPlacement: 'left' })
    testPopupPositionInRtl({ position: 'after', align: 'bottom', expectedPlacement: 'left-end' })
  })
})
