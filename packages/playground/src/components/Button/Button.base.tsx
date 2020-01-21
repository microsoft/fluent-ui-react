import React from 'react';
import { getSlots, IComponentWithSlotsAndRef } from '@fluentui/react-theming';
import { IButtonProps, IButtonSlots } from './Button.types';
import { useButton } from './useButton';

export const ButtonBase: IComponentWithSlotsAndRef<IButtonProps, IButtonSlots> = React.forwardRef(
  (props: IButtonProps, componentRef: React.Ref<HTMLElement>) => {
    const { children } = props;
    const slots = getSlots(ButtonBase, props);
    const { slotProps } = useButton(ButtonBase, { ...props, componentRef });

    return (
      <slots.root {...slotProps.root}>
        <slots.startIcon {...slotProps.startIcon} />
        {children}
        <slots.endIcon {...slotProps.endIcon} />
      </slots.root>
    );
  },
) as any; // can't get the forward ref to work here.

ButtonBase.slots = {
  root: 'span',
  startIcon: 'i',
  endIcon: 'i',
};
