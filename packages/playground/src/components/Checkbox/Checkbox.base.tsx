import * as React from 'react';
import { ICheckboxProps, ICheckboxSlots } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';
import { IComponentWithSlots, getSlots } from '@fluentui/react-theming';

export const CheckboxBase: IComponentWithSlots<ICheckboxProps, ICheckboxSlots> = (
  props: ICheckboxProps,
) => {
  const slots = getSlots(CheckboxBase, props);
  const { slotProps } = useCheckbox(CheckboxBase, props);

  return (
    <slots.root {...slotProps.root}>
      <slots.box {...slotProps.box}>
        <slots.icon {...slotProps.icon} />
      </slots.box>
      <slots.label {...slotProps.label} />
      <slots.input {...slotProps.input} />
    </slots.root>
  );
};

// Passing "CheckboxBase" give the mergeSlotProps helper access to mixing in variant
// classnames into the root element generally.
CheckboxBase.variants = ['checked', 'disabled', 'focused'];

// It also gives it access to the full list of slots here which can be used to craft
// a full slot props list.
CheckboxBase.slots = {
  root: 'div',
  box: 'div',
  input: 'input',
  icon: 'i',
  label: 'label',
};
