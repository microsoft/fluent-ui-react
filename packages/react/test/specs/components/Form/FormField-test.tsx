import * as React from 'react'

import { isConformant, implementsShorthandProp } from '../../commonTests'
import { mountWithProvider } from '../../../utils'
import Button from '@fluentui/react/src/components/Button/Button'
import RadioGroup from '@fluentui/react/src/components/RadioGroup/RadioGroup'
import Input from '@fluentui/react/src/components/Input/Input'
import Text from '@fluentui/react/src/components/Text/Text'
import FormField from '@fluentui/react/src/components/Form/FormField'
import Box from '@fluentui/react/src/components/Box/Box'

const formFieldImplementsShorthandProp = implementsShorthandProp(FormField)

const getFormField = (control: React.ComponentType<any> | string) =>
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
