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
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-label', '')).toBe(ariaLabel)
    })

    it('applies aria-labelledby if provided as prop', () => {
      const ariaLabelledBy = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} aria-labelledby={ariaLabelledBy} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(ariaLabelledBy)
    })

    it('applies default aria-labelledby as header id if header with id exists', () => {
      const headerId = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} header={{ id: headerId }} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(headerId)
    })

    it('applies default aria-labelledby as generated header id if header without id exists', () => {
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} header={'Welcome to my life'} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialogHeaderId = wrapper
        .find(`.${Dialog.slotClassNames.header}`)
        .filterWhere(n => typeof n.type() === 'string')
        .getDOMNode().id
      const dialog = wrapper.find(`.${Dialog.className}`)

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
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(undefined)
    })

    it('does not apply default aria-labelledby as header id if header is not supplied as prop', () => {
      const wrapper = mountWithProvider(<Dialog trigger={<Button content="Open a dialog" />} />)
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-labelledby', '')).toBe(undefined)
    })

    it('applies aria-describedby if provided as prop', () => {
      const ariaDescribedBy = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} aria-describedby={ariaDescribedBy} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-describedby', '')).toBe(ariaDescribedBy)
    })

    it('applies default aria-describedby as content id if content with id exists', () => {
      const contentId = 'element-id'
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} content={{ id: contentId }} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(getRenderedAttribute(dialog, 'aria-describedby', '')).toBe(contentId)
    })

    it('applies default aria-describedby as generated content id if content without id exists', () => {
      const wrapper = mountWithProvider(
        <Dialog trigger={<Button content="Open a dialog" />} content={'It is so awesome.'} />,
      )
      wrapper.find('.ui-button').simulate('click')
      const dialogContentId = wrapper
        .find(`.${Dialog.slotClassNames.content}`)
        .filterWhere(n => typeof n.type() === 'string')
        .getDOMNode().id
      const dialog = wrapper.find(`.${Dialog.className}`)

      expect(dialogContentId).toMatch(/dialog-content-\d+/)
      expect(getRenderedAttribute(dialog, 'aria-describedby', '')).toBe(dialogContentId)
    })
  })
})
