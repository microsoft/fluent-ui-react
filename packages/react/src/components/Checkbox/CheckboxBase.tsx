import * as React from 'react'

interface Props {
  checked?: boolean
  onChange?: any
  onClick?: any
  slots?: any
}

const CheckboxBase: React.FunctionComponent<Props> = props => {
  const { root: RootSlot = 'div' } = props.slots || {}
  const [isChecked, setIsChecked] = React.useState(!!props.checked)
  const realIsChecked = props.checked === undefined ? isChecked : !!props.checked
  const onChange = React.useCallback(
    (ev: any) => {
      if (props.onClick) {
        props.onClick(ev)
      }
      if (props.onChange) {
        props.onChange(ev)
      }
      if (!ev.defaultPrevented) {
        setIsChecked(!realIsChecked)
      }
    },
    [setIsChecked, realIsChecked, props.onChange],
  )
  return (
    <RootSlot onClick={onChange}>
      <input checked={realIsChecked} type="checkbox" />
      {props.children}
    </RootSlot>
  )
}
export default CheckboxBase
