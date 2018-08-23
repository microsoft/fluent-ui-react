import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const POSITIONS = [
  'top start',
  'top end',
  'bottom end',
  'bottom start',
  'end center',
  'start center',
  'top center',
  'bottom center',
]

// const PopupExample = () => (
//   <Popup trigger={<Button content="add" />} content="Add users to your feed" />
// )

// export default PopupExample

const PopupExamples = POSITIONS.map(position => (
  <div>
    <Popup position={position as any} trigger={<Button content={position} />} content={position} />
    <br />
    <br />
    <br />
  </div>
))

export default PopupExamples
