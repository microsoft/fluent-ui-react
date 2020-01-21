import * as React from 'react';
import cx from 'classnames';
import { IWithSlots, IComponentWithExtras } from '../slots.types';
import { getNativeProps, htmlElementProperties } from '@uifabric/utilities';

export interface IStandardProps<TSlots = { root: React.ReactType }> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  classes?: { [key in keyof TSlots]?: string };
}

export const mergeSlotProps = <
  TUserProps extends IWithSlots<TSlots> & IStandardProps<TSlots>,
  TSlots
>(
  Component: IComponentWithExtras<TSlots>,
  state: any,
  baseSlotProps: TUserProps['slotProps'] = {},
): NonNullable<Required<TUserProps['slotProps']>> => {
  const userSlotProps: any = state.slotProps || {};
  const { className, classes = {} } = state;
  const slotProps: any = {};

  // Build root class names, adding variants if needed.
  const rootClasses = [className];

  if (Component.variants) {
    for (const variant of Component.variants) {
      const variantValue = state[variant] as any;
      if (typeof variantValue === 'boolean' && variantValue) {
        rootClasses.push((classes as any)[variant]);
      } else if (typeof variantValue === 'string') {
        rootClasses.push(
          (classes as any)[
            variant + variantValue.substr(0, 1).toUpperCase() + variantValue.substr(1)
          ],
        );
      }
    }
  }

  for (const name in Component.slots) {
    const isRoot = name === 'root';
    const baseProps = (baseSlotProps as any)[name];

    slotProps[name] = {
      ...(isRoot && getNativeProps(state, htmlElementProperties)),
      ...baseProps,
      ...userSlotProps[name],
      className: cx(
        isRoot && rootClasses,
        (classes as any)[name],
        baseProps && baseProps.className,
      ),
    };
  }

  return slotProps as any;
};
