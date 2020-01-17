import * as React from 'react'
import { mount } from 'enzyme'
import CheckboxBase from 'src/components/Checkbox/CheckboxBase'
import * as keyboardKey from 'keyboard-key'

describe("Baby's first test", () => {
  it('renders something', () => {
    expect(mount(<CheckboxBase />)).toBeTruthy()
  })

  it('has an input', () => {
    const control = mount(<CheckboxBase />)
    const input = control
      .find('input')
      .first()
      .getDOMNode()
    expect(input).toBeTruthy()
  })

  it('can be checked', () => {
    const control = mount(<CheckboxBase checked={true} />)
    const inputChecked = control
      .find('input')
      .first()
      .prop('checked')
    expect(inputChecked).toBe(true)
  })

  it('can be unchecked', () => {
    const control = mount(<CheckboxBase />)
    const inputChecked = control
      .find('input')
      .first()
      .prop('checked')
    expect(inputChecked).toBe(false)
  })

  it('can switch check state', () => {
    const control = mount(<CheckboxBase />)
    const inputChecked = control
      .find('input')
      .first()
      .prop('checked')
    expect(inputChecked).toBe(false)
    control.setProps({ checked: true })
    const inputCheckedAfter = control
      .find('input')
      .first()
      .prop('checked')
    expect(inputCheckedAfter).toBe(true)
  })

  it('changes state when clicked', () => {
    const control = mount(<CheckboxBase />)
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false)
    control.simulate('click')
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(true)
    control.simulate('click')
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false)
  })

  it('calls onChange when checked state changes', () => {
    const change = jest.fn()
    const control = mount(<CheckboxBase onChange={change} />) // let, the only constant is change
    control.simulate('click')
    expect(change).toHaveBeenCalled()
  })

  it('does not change value when onChange prevents default', () => {
    const change = jest.fn((e: any) => e.preventDefault())
    const control = mount(<CheckboxBase onChange={change} />)
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false)
    control.simulate('click')
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false)
  })

  it('calls onClick', () => {
    const click = jest.fn()
    const control = mount(<CheckboxBase onClick={click} />)
    control.simulate('click')
    expect(click).toHaveBeenCalled()
  })

  it('renders content', () => {
    const control = mount(
      <CheckboxBase>
        <label>foo</label>
      </CheckboxBase>,
    )
    expect(control.find('label').length).toBe(1)
  })

  it('can render with a different root type', () => {
    const control = mount(<CheckboxBase slots={{ root: 'span' }} />)
    expect(control.find('span').length).toBe(1)
  })

  it('can render with a different input type', () => {
    const MyInput = () => (
      <a>
        <input type="hidden" value="I don't even know why anymore..." />
      </a>
    )
    const control = mount(<CheckboxBase slots={{ input: MyInput }} />)
    expect(control.find('a').length).toBe(1)
  })

  it('changes on enter press', () => {
    const control = mount(<CheckboxBase />)
    control.simulate('keydown', {
      keyCode: keyboardKey.Enter,
      key: 'Enter',
    })
    expect(control.find('input').prop('checked')).toBe(true)
  })

  describe('class handling', () => {
    it('renders classes', () => {
      const control = mount(<CheckboxBase classes={{ root: 'foo' }} />)
      expect(control.find('div.foo').length).toBe(1)
    })

    it('renders classes for input', () => {
      const control = mount(<CheckboxBase classes={{ input: 'foo' }} />)
      expect(control.find('input.foo').length).toBe(1)
    })
  })

  describe('slotProps', () => {
    it('renders slotProps for input', () => {
      const control = mount(<CheckboxBase slotProps={{ input: { 'data-foo': 'bar' } }} />)
      expect(control.find('input[data-foo="bar"]').length).toBe(1)
    })

    it('renders slotProps for root', () => {
      const control = mount(<CheckboxBase slotProps={{ root: { 'data-foo': 'bar' } }} />)
      expect(control.find('div[data-foo="bar"]').length).toBe(1)
    })

    it('applies unused props to the root element', () => {
      const control = mount(<CheckboxBase data-foo="bar" />)
      expect(control.find('div[data-foo="bar"]').length).toBe(1)
    })
  })
})
