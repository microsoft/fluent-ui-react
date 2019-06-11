import * as React from 'react'

import Tooltip from 'src/components/Tooltip/Tooltip'

import { mountWithProvider } from '../../../utils'

describe('Tooltip', () => {
  describe('onOpenChange', () => {
    test('is called on hover', () => {
      const spy = jest.fn()

      mountWithProvider(<Tooltip trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('mouseEnter')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })

    // https://github.com/stardust-ui/react/pull/619
    test('is called on hover when controlled', () => {
      const spy = jest.fn()

      mountWithProvider(
        <Tooltip open={false} trigger={<button />} content="Hi" onOpenChange={spy} />,
      )
        .find('button')
        .simulate('mouseEnter')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })
  })
})
