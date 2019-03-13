import * as React from 'react'
import { Label } from '@stardust-ui/react'

const labelSizes = ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']

const LabelExampleBadgeShorthand = () => (
  <>
    <Label
      content="Label content"
      detail="label detail"
      icon={{ name: 'emoji', outline: true }}
      iconPosition="start"
      badge
    />
    <br />
    <br />
    <Label
      content="Badge without additional text"
      icon={{ name: 'emoji', outline: true }}
      iconPosition="start"
      badge
    />
    <br />
    <br />
    <Label content="Badge without icon" badge />

    <br />
    <br />

    {labelSizes.map(size => (
      <Label key={size} size={size} content={size} />
    ))}
  </>
)
export default LabelExampleBadgeShorthand
