import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import { implementsShorthandProp } from '../../commonTests'
import { Button, RadioGroup, Input, Text, FormField } from '../../../../src/'
import { mountWithProvider } from '../../../utils'
import Slot from '../../../../src/components/Slot/Slot'

const formFieldImplementsShorthandProp = implementsShorthandProp(FormField)

describe('FormField', () => {
  isConformant(FormField)
  formFieldImplementsShorthandProp('label', Text)
  formFieldImplementsShorthandProp('message', Text)
  formFieldImplementsShorthandProp('control', Slot)

  it('renders the control provided in the control shorthand prop', () => {
    const controls = [Button, Input, 'input', RadioGroup]
    controls.forEach(control => {
      const formField = mountWithProvider(
        <FormField control={{ as: control }} name="firstName" />,
      ).find('FormField')

      const controlElement = formField.find(control)
      expect(controlElement.length).toEqual(1)
    })
  })
})
