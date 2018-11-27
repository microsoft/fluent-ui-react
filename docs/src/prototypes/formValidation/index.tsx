import * as React from 'react'
import { Header } from 'semantic-ui-react'
import FormValidationOnChange from './FormValidationOnChange'
import FormValidationOnSubmit from './FormValidationOnSubmit'

const FormValidationPrototype: React.SFC<{}> = () => (
  <div style={{ margin: '10px' }}>
    <Header content="Form validation on submit" />
    <FormValidationOnSubmit />
    <Header content="Form validation on change" />
    <FormValidationOnChange />
  </div>
)

export default FormValidationPrototype
