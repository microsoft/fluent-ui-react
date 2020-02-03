import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, {
    eventTargets: {
      onClick: `.${AccordionTitle.slotClassNames.content}`,
    },
  })

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: { as: 'h3' },
        defaultRootRole: undefined,
      })
    })
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, {
        defaultRootRole: 'heading',
      })
    })
  })

  const getContent = wrapper => wrapper.find(`div.${AccordionTitle.slotClassNames.content}`)

  describe('click handler', () => {
    it('is called on click', () => {
      const onClick = jest.fn()
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} />)

      getContent(wrapper).simulate('click')
      expect(onClick).toHaveBeenCalled()
    })

    it('is not called on click for disabled title', () => {
      const onClick = jest.fn()
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} disabled={true} />)

      getContent(wrapper).simulate('click')
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Enter key', () => {
    it('calls onClick', () => {
      const onClick = jest.fn()
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} />)

      getContent(wrapper).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      })
      expect(onClick).toHaveBeenCalled()
    })

    it('does not call onClick for disabled title', () => {
      const onClick = jest.fn()
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} disabled={true} />)

      getContent(wrapper).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      })
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
