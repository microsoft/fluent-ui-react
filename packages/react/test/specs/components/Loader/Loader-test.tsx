import * as React from 'react'

import { Loader } from '@fluentui/react'
import { isConformant } from '../../commonTests'
import { mountWithProvider } from '../../../utils'

describe('Loader', () => {
  isConformant(Loader)

  describe('delay', () => {
    it('is "0" by default', () => {
      const wrapper = mountWithProvider(<Loader />)

      expect(wrapper.find(Loader).prop('delay')).toBe(0)
    })

    it('renders children only when "delay" is passed', () => {
      jest.useFakeTimers()

      const selector = `.${Loader.className}`
      const wrapper = mountWithProvider(<Loader delay={500} />)

      expect(wrapper.find(selector).exists()).toBe(false)

      jest.runAllTimers()
      wrapper.update()
      expect(wrapper.find(selector).exists()).toBe(true)
    })
  })
})
