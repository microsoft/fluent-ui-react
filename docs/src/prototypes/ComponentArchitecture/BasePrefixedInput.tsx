import * as React from 'react'

interface Props {
  value: string
  slots: any
}

export const BasePrefixedInput: React.FunctionComponent<Props> = props => {
  const { root: Root = 'span', input: Input = 'input', icon: Icon = 'span' } = props.slots || {}
  return (
    <Root>
      <Icon />
      <Input value={props.value} />
    </Root>
  )
}
