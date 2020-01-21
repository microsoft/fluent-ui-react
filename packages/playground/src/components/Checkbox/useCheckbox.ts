import { useState, useCallback } from 'react';
import { useControlledState } from '../../hooks/useControlledState';
import { mergeSlotProps, IComponentWithSlots } from '@fluentui/react-theming';
import { ICheckboxProps, ICheckboxSlots } from './Checkbox.types';

/**
 * Hook which takes in user props and returns { state, slotProps }.
 * @param props User props.
 * @returns Object containing `state` and `slotProps`.
 */
export const useCheckbox = (
  Component: IComponentWithSlots<ICheckboxProps, ICheckboxSlots>,
  props: ICheckboxProps,
) => {
  const { disabled, label, onChange } = props;
  const [checked, setChecked] = useControlledState(props.checked, props.defaultChecked);
  const [focused, setFocused] = useState(false);
  const state = { ...props, checked, focused };

  const onInputChange = useCallback(
    (ev: React.FormEvent) => {
      if (!disabled) {
        if (onChange) {
          onChange(ev, !checked);
        }

        if (!ev.defaultPrevented) {
          setChecked(!checked);
        }
      }
    },
    [checked, disabled, onChange],
  );

  const slotProps = mergeSlotProps(Component, state, {
    input: {
      'aria-disabled': disabled,
      'aria-checked': checked,
      type: 'checkbox',
      role: 'checkbox',
      checked: !!checked,
      disabled,
      onChange: onInputChange,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
    label: {
      children: label,
    },
  });

  return {
    slotProps,
    state,
  };
};
