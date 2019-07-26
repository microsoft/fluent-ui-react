import * as React from 'react'
import { Loader, LoaderProps, Segment } from '@stardust-ui/react'

type ExamplePlaceholderProps = Partial<{
  children: JSX.Element
  size: LoaderProps['size']
  visible: boolean
}>

const paddings: { [key in LoaderProps['size']]: number } = {
  smallest: 0,
  smaller: 5,
  small: 15,
  medium: 25,
  large: 40,
  larger: 65,
  largest: 100,
}

const ExamplePlaceholder: React.FunctionComponent<ExamplePlaceholderProps> = props => {
  const { children, size, visible } = props

  if (visible) return children

  return (
    <Segment variables={{ padding: `${paddings[size]}px` }}>
      <Loader size={size} />
    </Segment>
  )
}

export default ExamplePlaceholder
