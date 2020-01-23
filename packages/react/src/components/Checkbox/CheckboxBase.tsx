import * as React from 'react'

interface CheckboxBaseProps {
  checked?: boolean
  onChange?: React.ChangeEventHandler
  onClick?: React.MouseEventHandler
  slots?: {
    root?: any
    input?: any
  }
  slotProps?: {
    root?: any
    input?: any
  }
  classes?: any
}

const Testhelper = (prop?: Function, propName?: string) => {
  if (!prop) {
    return {}
  }
  return {
    [propName]: prop,
  }
}

const CheckboxBase: React.FunctionComponent<CheckboxBaseProps> = props => {
  const { checked, onChange, onClick, classes = {}, slots = {}, slotProps = {}, ...rest } = props
  const { root: RootSlot = 'div', input: InputSlot = 'input' } = slots
  const { root: rootClass, input: inputClass } = classes
  const { root: rootProps, input: inputProps } = slotProps

  const [isChecked, setIsChecked] = React.useState(!!checked)
  const realIsChecked = checked === undefined ? isChecked : !!checked

  const onChangeHandler = React.useCallback(
    (ev: any) => {
      if (onClick) {
        onClick(ev)
      }
      if (!ev.defaultPrevented) {
        if (onChange) {
          onChange(ev)
        }
      }
      if (!ev.defaultPrevented) {
        setIsChecked(!realIsChecked)
      }
    },
    [setIsChecked, realIsChecked, onChange],
  )

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      console.log(ev.keyCode)
      switch (ev.keyCode) {
        case 13:
        case 32: {
          setIsChecked(!realIsChecked)
        }
      }
    },
    [setIsChecked, realIsChecked],
  )

  return (
    <RootSlot
      onKeyDown={onKeyDown}
      onClick={onChangeHandler}
      className={rootClass}
      {...rest}
      {...rootProps}
      {...Testhelper(onChange, 'onChange')}
    >
      <InputSlot checked={realIsChecked} type="checkbox" className={inputClass} {...inputProps} />
      {props.children}
    </RootSlot>
  )
}
export default CheckboxBase
