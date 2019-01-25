import { Placement } from 'popper.js'
import * as React from 'react'

import {
  getPopupPlacement,
  applyRtlToOffset,
  Position,
  Alignment,
} from 'src/components/Popup/positioningHelper'
import Popup from 'src/components/Popup/Popup'
import { mountWithProvider } from '../../../utils'

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
      const actualPlacement = getPopupPlacement({ align, position, rtl })
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

  describe('Popup offset transformed correctly in RTL', () => {
    it("applies transform only for 'above' and 'below' postioning", () => {
      const originalOffsetValue = '100%'

      expect(applyRtlToOffset(originalOffsetValue, 'above')).not.toBe(originalOffsetValue)
      expect(applyRtlToOffset(originalOffsetValue, 'below')).not.toBe(originalOffsetValue)

      expect(applyRtlToOffset(originalOffsetValue, 'before')).toBe(originalOffsetValue)
      expect(applyRtlToOffset(originalOffsetValue, 'after')).toBe(originalOffsetValue)
    })

    const expectOffsetTransformResult = (originalOffset, resultOffset) => {
      expect(applyRtlToOffset(originalOffset, 'above')).toBe(resultOffset)
    }

    it('flips sign of simple expressions', () => {
      expectOffsetTransformResult('100%', '-100%')
      expectOffsetTransformResult('  2000%p ', '-2000%p')
      expectOffsetTransformResult('100  ', '-100')
      expectOffsetTransformResult(' - 200vh', '200vh')
    })

    it('flips sign of complex expressions', () => {
      expectOffsetTransformResult('100% + 200', '-100% - 200')
      expectOffsetTransformResult(' - 2000%p - 400 +800vh ', '2000%p + 400 -800vh')
    })

    it('transforms only horizontal offset value', () => {
      const xOffset = '-100%'
      const yOffset = '800vh'

      const offsetValue = [xOffset, yOffset].join(',')
      const [xOffsetTransformed, yOffsetTransformed] = applyRtlToOffset(offsetValue, 'above').split(
        ',',
      )

      expect(xOffsetTransformed.trim()).not.toBe(xOffset)
      expect(yOffsetTransformed.trim()).toBe(yOffset)
    })
  })

  describe('onOpenChange', () => {
    test('is called on click', () => {
      const spy = jest.fn()

      mountWithProvider(<Popup trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })

    // https://github.com/stardust-ui/react/pull/619
    test('is called on click when controlled', () => {
      const spy = jest.fn()

      mountWithProvider(<Popup open={false} trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })
  })
})
