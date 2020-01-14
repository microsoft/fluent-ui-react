import * as React from 'react'
import { Embed } from '@fluentui/react'
import { isConformant, handlesAccessibility } from '../../commonTests'
import { mountWithProviderAndGetComponent } from '../../../utils'

describe('Embed', () => {
  isConformant(Embed)

  describe('accessibility', () => {
    handlesAccessibility(Embed, { defaultRootRole: 'presentation' })
  })

  describe('onClick', () => {
    test('is called with (e, props) on a click', () => {
      const onClick = jest.fn()
      const embed = mountWithProviderAndGetComponent(Embed, <Embed onClick={onClick} />)

      embed.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onClick, active: true }),
      )
    })
  })

  describe('onActiveChanged', () => {
    test('is called with (e, props) on a click', () => {
      const onActiveChanged = jest.fn()
      const embed = mountWithProviderAndGetComponent(
        Embed,
        <Embed onActiveChanged={onActiveChanged} />,
      )

      embed.simulate('click')

      expect(onActiveChanged).toHaveBeenCalledTimes(1)
      expect(onActiveChanged).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onActiveChanged, active: true }),
      )
    })
  })
})
