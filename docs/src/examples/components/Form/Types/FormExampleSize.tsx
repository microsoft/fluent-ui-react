import React from 'react'
import * as _ from 'lodash'
import { Provider, Form, Button, Input, Text, Divider } from '@stardust-ui/react'

const FormExampleSize = () => (
  <Provider.Consumer
    render={({ siteVariables }) => {
      return _.map(siteVariables.fontSizes, (value, key) => (
        <div key={key} style={{ marginTop: '10px' }}>
          <Text size={key} content={`Size: ${key}`} />
          <Divider />
          <Form
            columns={1}
            onSubmit={() => {
              alert('Form submitted')
            }}
            size={key}
          >
            <Form.Field label="First name" control={Input} name="firstName" id="first-name" />
            <Form.Field label="Last name" control={Input} name="lastName" id="last-name" />
            <Form.Field as={Button}>Submit</Form.Field>
          </Form>
        </div>
      ))
    }}
  />
)
export default FormExampleSize
