import _ from 'lodash'
import React from 'react'
import { Divider } from '@stardust-ui/react'

const colors = [
  'primary',
  'secondary',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
  'white',
]

const DividerExampleColor = () =>
  _.map(colors, color => (
    <Divider color={color} key={color}>
      {_.startCase(color)}
    </Divider>
  ))

export default DividerExampleColor
