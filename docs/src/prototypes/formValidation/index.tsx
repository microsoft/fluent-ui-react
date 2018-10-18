import * as React from 'react'
import { Header } from '@stardust-ui/react'
import FormValidationOnChange from './FormValidationOnChange'
import FormValidationOnSubmit from './FormValidationOnSubmit'

class FormValidationPrototype extends React.Component<any, any> {
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <Header content={'Form validation on change'} />
        <FormValidationOnChange />
        <Header content={'Form validation on submit'} />
        <FormValidationOnSubmit />
      </div>
    )
  }
}

export default FormValidationPrototype
