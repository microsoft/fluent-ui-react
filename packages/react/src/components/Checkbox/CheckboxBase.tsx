import * as React from 'react'

interface Props {
  checked?: boolean
  onChange?: any
  onClick?: any
  slots?: any
  slotProps?: any
  classes?: any
}

const CheckboxBase: React.FunctionComponent<Props> = props => {
  const { checked, classes = {}, slots = {}, slotProps = {}, ...rest } = props
  const { root: RootSlot = 'div', input: InputSlot = 'input' } = slots
  const { root: rootClass, input: inputClass } = classes
  const { root: rootProps, input: inputProps } = slotProps
  const [isChecked, setIsChecked] = React.useState(!!checked)
  const realIsChecked = checked === undefined ? isChecked : !!checked
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
  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.keyCode === 13) {
        setIsChecked(!realIsChecked)
      }
    },
    [setIsChecked, realIsChecked],
  )
  return (
    <RootSlot
      onKeyDown={onKeyDown}
      onClick={onChange}
      className={rootClass}
      {...rest}
      {...rootProps}
    >
      <InputSlot checked={realIsChecked} type="checkbox" className={inputClass} {...inputProps} />
      {props.children}
    </RootSlot>
  )
}
export default CheckboxBase
