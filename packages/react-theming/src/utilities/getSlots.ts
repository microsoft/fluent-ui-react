import * as React from 'react';
import { IComponentWithExtras } from '../slots.types';

export const getSlots = <
  TProps extends { as?: string; slots?: Partial<TSlots> },
  TSlots extends { root: string | React.ReactType }
>(
  Component: IComponentWithExtras<TSlots>,
  props: TProps,
): TSlots => {
  const slots: TSlots = { ...Component.slots, ...props.slots };

  if (props.as) {
    slots.root = props.as as string | React.ReactType;
  }

  return slots;
};
