import * as React from 'react'
import { Loader, Segment, LoaderProps } from '@stardust-ui/react'

type DelayedRendererProps = Partial<{
  children: JSX.Element
  placeholder: JSX.Element | LoaderProps['size']
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

const createPlaceholder = (placeholder: DelayedRendererProps['placeholder']): JSX.Element => {
  const size = typeof placeholder === 'string' ? placeholder : 'medium'

  if (React.isValidElement(placeholder)) return placeholder

  return (
    <Segment variables={{ padding: `${paddings[size]}px` }}>
      <Loader size={size} />
    </Segment>
  )
}

const DelayedRenderer: React.FunctionComponent<DelayedRendererProps> = props => {
  const { children, placeholder, visible } = props
  return visible ? children : createPlaceholder(placeholder)
}

export default DelayedRenderer
