import * as React from 'react'
import { ComponentClass } from 'enzyme'

import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'
import { Button, RadioGroup, Input, Text, FormField } from 'src/index'
import Box from 'src/components/Box/Box'

const formFieldImplementsShorthandProp = implementsShorthandProp(FormField)

const getFormField = (control: ComponentClass<any> | string) =>
  mountWithProvider(<FormField control={{ as: control }} name="firstName" />).find('FormField')

describe('FormField', () => {
  isConformant(FormField)
  formFieldImplementsShorthandProp('label', Text)
  formFieldImplementsShorthandProp('message', Text)
  formFieldImplementsShorthandProp('control', Box, { mapsValueToProp: 'children' })

  it('renders the component control provided in the control shorthand prop', () => {
    const controls = [Button, Input, RadioGroup]

    controls.forEach(control => {
      const formField = getFormField(control)
      const controlElement = formField.find(control)

      expect(controlElement.length).toEqual(1)
    })
  })

  it('renders the primitive control provided in the control shorthand prop', () => {
    const formField = getFormField('input')
    const controlElement = formField.find('input')

    expect(controlElement.length).toEqual(1)
  })
})
