import * as React from 'react'

import Dialog from 'src/components/Dialog/Dialog'
import Button from 'src/components/Button/Button'
import { getRenderedAttribute } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

describe('Dialog', () => {
  describe('accessibility', () => {
    it('applies aria-label if provided as prop', () => {
      const ariaLabel = 'super label'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} aria-label={ariaLabel} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find('.ui-dialog')

      expect(getRenderedAttribute(dialog, 'aria-label', '')).toBe(ariaLabel)
    })

    it('applies aria-labelledby if provided as prop', () => {
      const ariaLabelledBy = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} aria-labelledby={ariaLabelledBy} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find('.ui-dialog')

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(ariaLabelledBy)
    })

    it('applies default aria-labelledby as header id if header with id exists', () => {
      const headerId = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} header={{ id: headerId }} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find('.ui-dialog')

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(headerId)
    })

    it('applies default aria-labelledby as generated header id if header without id exists', () => {
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} header={'Welcome to my life'} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialogHeaderId = wrapper.find('.ui-header').getDOMNode().id
      const dialog = wrapper.find('.ui-dialog')

      expect(dialogHeaderId).toMatch(/dialog-header-\d+/)
      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(dialogHeaderId)
    })

    it('does not apply default aria-labelledby as header id if aria-label is supplied as prop', () => {
      const wrapper = mountWithProvider(
        <Dialog
          trigger={<Button content="Open a dialog" />}
          aria-label={'bla-bla-label'}
          header={{ id: 'bla-bla-id' }}
        />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find('.ui-dialog')

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(undefined)
    })

    it('does not apply default aria-labelledby as header id if header is not supplied as prop', () => {
      const wrapper = mountWithProvider(<Dialog trigger={<Button content="Open a dialog" />} />)
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find('.ui-dialog')

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(undefined)
    })
  })
})
