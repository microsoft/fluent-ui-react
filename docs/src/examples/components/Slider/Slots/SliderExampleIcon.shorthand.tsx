import * as React from 'react'
import { Slider, Form } from '@stardust-ui/react'

const SliderExampleIconShorthand = () => (
  <Form>
    <Form.Field label="iconPosition='start'" control={{ as: Slider, icon: 'mic' }} id="start" />
    <Form.Field
      label="iconPosition='end'"
      control={{ as: Slider, icon: 'mic', iconPosition: 'end' }}
      id="end"
    />
  </Form>
)

export default SliderExampleIconShorthand
